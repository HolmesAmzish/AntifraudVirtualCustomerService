package cn.arorms.raicom.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfig {
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder, ToolCallbackProvider tools) {
        if (tools != null) {
            builder.defaultToolCallbacks(tools);
        }
        return builder.build();
    }
}
