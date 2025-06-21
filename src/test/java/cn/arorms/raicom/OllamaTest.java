package cn.arorms.raicom;

import org.junit.jupiter.api.Test;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.core.publisher.Flux;

@SpringBootTest
public class OllamaTest {

    @Autowired
    private OllamaChatModel ollamaChatModel;

    @Test
    public void ollamaStreamRespondTest() {
        Flux<String> responseStream = ollamaChatModel.stream("Can you tell me why sky is blue");

        // 实时订阅并打印每个片段
        responseStream
                .doOnNext(System.out::print)  // 每收到一个片段就打印
                .doOnComplete(() -> System.out.println("\n【流式输出已完成】"))
                .blockLast(); // 等待整个流结束（防止测试提前退出）
    }
}