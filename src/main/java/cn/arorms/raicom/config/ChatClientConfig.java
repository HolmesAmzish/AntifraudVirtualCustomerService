package cn.arorms.raicom.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.openai.OpenAiChatModel;
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
            ToolCallbackProvider tools,
            ChatMemory chatMemory, OpenAiChatModel openAiChatModel) {
        return ChatClient.builder(openAiChatModel)
                .defaultToolCallbacks(tools)
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .build();
    }

}

