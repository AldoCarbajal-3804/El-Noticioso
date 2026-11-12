package com.example.el_noticioso_scrapping;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ServiceScraping {

    private static final String URL = "https://elcomercio.pe/ultimas-noticias/";
    private static final String BASE = "https://elcomercio.pe";
    private static final int LIMITE = 4;

    @Cacheable(value = "noticias", sync = true)
    public List<ExtrasDTO> obtenerUltimasNoticias() throws IOException {
        Document doc = Jsoup.connect(URL)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36")
                .timeout(15_000)
                .get();

        List<ExtrasDTO> noticias = new ArrayList<>();

        // Cada noticia es un div.story-item (ver example.txt)
        for (Element item : doc.select("div.story-item")) {
            Element enlace = item.selectFirst("h2 a.story-item__title");
            if (enlace == null) {
                continue; // bloque sin titular: no es una noticia
            }

            String href = enlace.attr("href");
            String urlNoticia = href.startsWith("http") ? href : BASE + href;

            Element fechaEl = item.selectFirst("time[itemprop=datePublished]");
            Date fecha = null;
            if (fechaEl != null && !fechaEl.attr("datetime").isBlank()) {
                fecha = Date.from(Instant.parse(fechaEl.attr("datetime")));
            }

            Element imagen = item.selectFirst("img.story-item__img");
            Element autor = item.selectFirst("a.story-item__author");

            noticias.add(new ExtrasDTO(
                    urlNoticia,
                    enlace.text(),
                    fecha,
                    imagen != null ? imagen.attr("src") : null,
                    autor != null ? autor.text() : null
            ));
        }

        return noticias.stream().limit(LIMITE).toList();
    }

}
