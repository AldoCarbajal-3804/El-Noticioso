package com.example.el_noticioso_ia;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
@EnableCaching
public class ConfigCache {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager("efemerides");
        manager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(Duration.ofHours(24))
                .maximumSize(7));
        return manager;
    }
}
