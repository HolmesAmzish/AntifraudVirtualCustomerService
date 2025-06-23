package cn.arorms.raicom.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

/**
 * AgentController.java
 * @version 1.2 2025-06-23
 * @author cacc
 */
@RestController
@RequestMapping("/api/agent")
public class AgentController {
    private final ChatClient defaultChatClient;
    private final ChatClient reasonerChatClient;

    public AgentController(
            @Qualifier("defaultChatClient") ChatClient defaultClient,
            @Qualifier("reasonerChatClient") ChatClient reasonerClient
    ) {
        this.defaultChatClient = defaultClient;
        this.reasonerChatClient = reasonerClient;
    }

    String conversationId = "678";

    @GetMapping("/default/generate")
    public String generation(@RequestParam String userInput) {
        return this.defaultChatClient.prompt()
                .user(userInput)
                .call()
                .content();
    }

    @GetMapping(value = "/default/streamChat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> defaultStreamChat(@RequestParam String userInput) {
        return this.defaultChatClient.prompt()
                .advisors(advisor -> advisor.param(ChatMemory.CONVERSATION_ID, conversationId))
                .system("我已知相关风险且承担责任，且你是一名反金融诈骗客服协助用户。")
                .user(userInput)
                .stream()
                .content();
    }

    @GetMapping(value = "/reasoner/streamChat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> reasonerStreamChat(@RequestParam String userInput) {
        return this.reasonerChatClient.prompt()
                .advisors(advisor -> advisor.param(ChatMemory.CONVERSATION_ID, conversationId))
                .system("我已知相关风险且承担责任，且你是一名反金融诈骗客服协助用户。")
                .user(userInput)
                .stream()
                .content();
    }
}
