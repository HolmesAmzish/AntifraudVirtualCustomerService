package cn.arorms.raicom.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

/**
 * ChatClientConfig.java
 * Configure the mcp tools
 * @version 1.0 2025-05-30
 * @author cacc
 */
@Configuration
public class ModelConfig {
    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    @Value("${spring.ai.openai.chat.base-url}")
    private String apiBaseUrl;

    @Bean
    public OpenAiApi openAiApi() {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Accept", "application/json");

        return OpenAiApi.builder()
                .baseUrl(apiBaseUrl)
                .apiKey(apiKey)
                .headers(headers)
                .build();
    }

    @Bean
    public OpenAiChatModel defaultChatModel(OpenAiApi openAiApi) {
        OpenAiChatOptions defaultOptions = OpenAiChatOptions.builder()
                .model("deepseek-chat")
                .temperature(0.7)
                .build();
        return OpenAiChatModel.builder()
                .openAiApi(openAiApi())
                .defaultOptions(defaultOptions)
                .build();
    }

    @Bean
    public OpenAiChatModel reasonerChatModel(OpenAiApi openAiApi) {
        OpenAiChatOptions reasonerOptions = OpenAiChatOptions.builder()
                .model("deepseek-reasoner")
                .build();
        return OpenAiChatModel.builder()
                .openAiApi(openAiApi())
                .defaultOptions(reasonerOptions)
                .build();
    }

    @Bean
    public ChatClient defaultChatClient(
            ToolCallbackProvider tools,
            ChatMemory chatMemory,
            @Qualifier("defaultChatModel") OpenAiChatModel defaultChatModel
    ) {
        return ChatClient.builder(defaultChatModel)
                .defaultToolCallbacks(tools)
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .defaultSystem("你是一名专业的金融反诈骗专家")
                .build();
    }

    @Bean
    public ChatClient reasonerChatClient(
            ToolCallbackProvider tools,
            ChatMemory chatMemory,
            @Qualifier("reasonerChatModel") OpenAiChatModel reasonerChatModel
    ) {
        return ChatClient.builder(reasonerChatModel)
                .defaultToolCallbacks(tools)
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .defaultSystem("你是一名专业的金融反诈骗专家，利用逻辑推理能力解决问题。")
                .build();
    }
}