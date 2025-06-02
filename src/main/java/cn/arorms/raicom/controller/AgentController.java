package cn.arorms.raicom.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

/**
 * AgentController.java
 * @version 1.0 2025-05-30
 * @author cacc
 */
@RestController
public class AgentController {
    private final ChatClient chatClient;

    public AgentController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    /**
     * 普通问答接口（非流式）
     */
    @GetMapping("/chat")
    public String generation(@RequestParam String userInput) {
        return this.chatClient.prompt()
                .user(userInput)
                .call()
                .content();
    }

    /**
     * 流式问答接口（返回字符串流 Flux<String>）
     */
    @GetMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> generationStream(@RequestParam String userInput) {
        return this.chatClient.prompt()
                .user(userInput)
                .stream()
                .content();
    }
}
