package com.example.el_noticioso_scrapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class ControllerScraping {

    private final ServiceScraping scraper;

    public ControllerScraping(ServiceScraping scraper) {
        this.scraper = scraper;
    }

    @GetMapping("/api/scraping/ultimas-noticias")
    public List<ExtrasDTO> ultimasNoticias() throws IOException {
        return scraper.obtenerUltimasNoticias();
    }
}
