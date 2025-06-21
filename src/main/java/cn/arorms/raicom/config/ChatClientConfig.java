package cn.arorms.raicom.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * ChatClientConfig.java
 * Configure the mcp tools
 * @version 1.0 2025-05-30
 * @author cacc
 */
@Configuration
public class ChatClientConfig {
    @Bean
    public ChatClient chatClient(
            OllamaChatModel ollamaChatModel,
            ToolCallbackProvider tools,
            ChatMemory chatMemory) {
        return ChatClient.builder(ollamaChatModel)
                .defaultToolCallbacks(tools)
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .build();
    }

}

