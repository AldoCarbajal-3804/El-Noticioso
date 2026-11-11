package com.example.el_noticioso_ia;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class ControllerAI {

    private static final ZoneId ZONA = ZoneId.of("America/Lima");

    private static final String[] MESES = {
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    };

    // Cada día del archivo tiene: <div class="dia-titulo">10 de Enero</div> seguido de su <ul>
    private static final Pattern BLOQUE_DIA = Pattern.compile(
            "<div class=\"dia-titulo\">([^<]+)</div>\\s*(<ul class=\"efemerides-list\">.*?</ul>)",
            Pattern.DOTALL);

    // Clave: "10 de noviembre" -> <ul> de ese día
    private final Map<String, String> porDia = new HashMap<>();

    public ControllerAI() throws IOException {
        String contenido = new ClassPathResource("efemerides.txt")
                .getContentAsString(StandardCharsets.UTF_8);

        Matcher m = BLOQUE_DIA.matcher(contenido);
        while (m.find()) {
            porDia.put(m.group(1).trim().toLowerCase(), m.group(2));
        }
        if (porDia.isEmpty()) {
            throw new IllegalStateException("No se encontraron efemérides en efemerides.txt");
        }
    }

    // La ruta debe coincidir con la que reenvía el gateway (/api/efemerides)
    @GetMapping("/api/efemerides")
    @Cacheable(
            value = "efemerides",
            key = "T(com.example.el_noticioso_ia.ControllerAI).fechaVigente()",
            sync = true
    )
    public Map<String, String> generate() {
        LocalDate fecha = fechaVigente();
        String clave = fecha.getDayOfMonth() + " de " + MESES[fecha.getMonthValue() - 1];

        String html = porDia.get(clave);
        if (html == null) {
            throw new IllegalStateException("No hay efemérides para " + clave);
        }

        return Map.of("generation", html);
    }

    /** Día de las efemérides: cambia a las 12:00 (hora de Lima). Lo usa también la clave de caché. */
    public static LocalDate fechaVigente() {
        return LocalDateTime.now(ZONA).minusHours(12).toLocalDate();
    }
}
