package cn.arorms.raicom.controller;

import cn.arorms.raicom.entity.NewsEntity;
import cn.arorms.raicom.service.NewsService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * NewsController
 * @version 1.0 2025-06-20
 * @author Amzish
 */
@RestController
@RequestMapping("/api/news")
public class NewsController {
    private NewsService newsService;

    @GetMapping("/getAll")
    public List<NewsEntity> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/getById")
    public NewsEntity getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id);
    }

//    @PostMapping()
//    public int addNews(@RequestBody NewsEntity news) {
//        return newsService.addNews(news);
//    }
//
//    @PutMapping("/{id}")
//    public int updateNews(@PathVariable Long id, @RequestBody NewsEntity news) {
//        news.setId(id);
//        return newsService.updateNews(news);
//    }
//
//    @DeleteMapping("/{id}")
//    public int deleteNews(@PathVariable Long id) {
//        return newsService.deleteNews(id);
//    }
}
