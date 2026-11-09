package com.example.el_noticioso_ia;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

@RestController
public class ControllerAI {

    private final OpenAiChatModel chatModel;
    private final String prompt;

    public ControllerAI(OpenAiChatModel chatModel,
                        @Value("${efemerides.prompt}") String prompt) {
        this.chatModel = chatModel;
        this.prompt = prompt;
    }

    @GetMapping("/ai/generate")
    @Cacheable(
            value = "efemerides",
            key = "T(java.time.LocalDateTime).now(T(java.time.ZoneId).of('America/Lima')).minusHours(12).toLocalDate()",
            sync = true
    )
    public Map<String, String> generate() {
        return Map.of("generation", Objects.requireNonNull(chatModel.call(prompt)));
    }
}