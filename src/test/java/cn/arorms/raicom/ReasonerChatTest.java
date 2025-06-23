package cn.arorms.raicom;

import org.junit.jupiter.api.Test;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.core.publisher.Flux;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@SpringBootTest
public class ReasonerChatTest {

    private final ChatClient chatClient;

    public ReasonerChatTest(@Qualifier("reasonerChatClient") ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @Test
    void testStreamResponse() throws InterruptedException {
        String userInput = "Hello there";
        Flux<String> responseFlux = chatClient.prompt()
                .user(userInput)
                .stream()
                .content();

        CountDownLatch countDownLatch = new CountDownLatch(1);

        responseFlux.doOnNext(System.out::println)
                .doOnError(Throwable::printStackTrace)
                .doOnComplete(countDownLatch::countDown)
                .subscribe();

        boolean completed = countDownLatch.await(30, TimeUnit.SECONDS);
        if (!completed) {
            System.err.println("流处理未在指定时间内完成");
        }
    }
}