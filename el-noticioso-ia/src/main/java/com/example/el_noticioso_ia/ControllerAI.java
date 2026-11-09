package com.example.el_noticioso_ia;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ControllerAI {

    private final OpenAiChatModel chatModel;
    private final String prompt;

    public ControllerAI(OpenAiChatModel chatModel,
                        @Value("${efemerides.prompt}") String prompt) {
        this.chatModel = chatModel;
        this.prompt = prompt;
    }

    // La ruta debe coincidir con la que reenvía el gateway (/api/efemerides)
    @GetMapping("/api/efemerides")
    @Cacheable(
            value = "efemerides",
            key = "T(java.time.LocalDateTime).now(T(java.time.ZoneId).of('America/Lima')).minusHours(12).toLocalDate()",
            sync = true
    )
    public Map<String, String> generate() {
        String texto = chatModel.call(prompt);

        // Si la respuesta está vacía, se lanza una excepción: así no se guarda en caché
        if (texto == null || texto.isBlank()) {
            throw new IllegalStateException("La IA devolvió una respuesta vacía");
        }

        return Map.of("generation", texto);
    }
}
