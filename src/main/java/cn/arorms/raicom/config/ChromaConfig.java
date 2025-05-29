package cn.arorms.raicom.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ai.chroma.vectorstore.ChromaVectorStore;

@Configuration
public class ChromaConfig {

    @Bean
    public ChromaVectorStore chromaVectorStore() {
        // 连接本地启动的 Chroma Server（确保端口号正确）
        return new ChromaVectorStore("http://localhost:8000");
    }
}
