package cn.arorms.raicom.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chroma.vectorstore.ChromaVectorStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AgentController {
    private final ChatClient chatClient;
    private final ChromaVectorStore vectorStore;

    public AgentController(ChatClient chatClient, ChromaVectorStore vectorStore) {
        this.chatClient = chatClient;
        this.vectorStore = vectorStore;
    }

    @GetMapping("/chat")
    String generation(String userInput) {
        return this.chatClient.prompt()
                .user(userInput)
                .call()
                .content();
    }

    @GetMapping("/chatWithRag")
    String generationWithRag(String userInput) {
        return this.chatClient.prompt()
                .advisors(new QuestionAnswerAdvisor(vectorStore))
                .user(userInput)
                .call()
                .content();
    }
}
