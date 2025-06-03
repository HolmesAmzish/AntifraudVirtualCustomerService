package cn.arorms.raicom.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

/**
 * AgentController.java
 * @version 1.0 2025-05-30
 * @author cacc
 */
@RestController
@RequestMapping("/api/agent")
public class AgentController {
    private final ChatClient chatClient;

    public AgentController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    String conversationId = "678";

    @GetMapping("/chat")
    public String generation(@RequestParam String userInput) {
        return this.chatClient.prompt()
                .user(userInput)
                .call()
                .content();
    }

    @GetMapping(value = "/streamChat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> generationStream(@RequestParam String userInput) {
        return this.chatClient.prompt()
                .advisors(advisor -> advisor.param(ChatMemory.CONVERSATION_ID, conversationId))
                .user(userInput)
                .stream()
                .content();
    }
}
