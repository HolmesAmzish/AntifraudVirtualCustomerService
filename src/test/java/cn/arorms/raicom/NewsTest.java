package cn.arorms.raicom;

import cn.arorms.raicom.entity.NewsEntity;
import cn.arorms.raicom.service.NewsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class NewsTest {
    @Autowired
    NewsService newsService;

    @Test
    public void printAllNews() {
        List<NewsEntity> fetchedNews = newsService.getAllNews();
    }
}
