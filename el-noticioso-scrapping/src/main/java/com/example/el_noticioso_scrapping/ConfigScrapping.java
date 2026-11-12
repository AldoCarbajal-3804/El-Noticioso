package com.example.el_noticioso_scrapping;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
@EnableCaching
public class ConfigScrapping {

    // Las noticias se guardan 24 horas; luego el scraper vuelve a consultar la página
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager("noticias");
        manager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(Duration.ofHours(24))
                .maximumSize(10));
        return manager;
    }

}
