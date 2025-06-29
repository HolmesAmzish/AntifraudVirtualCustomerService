package cn.arorms.raicom.service;

import cn.arorms.raicom.entity.NewsEntity;
import cn.arorms.raicom.mapper.NewsMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {
    private NewsMapper newsMapper;

    public List<NewsEntity> getAllNews() {
        return newsMapper.findAll();
    }

    public NewsEntity getNewsById(Long id) {
        return newsMapper.findById(id);
    }

//    public int addNews(NewsEntity news) {
//        return newsMapper.insert(news);
//    }
//
//    public int updateNews(NewsEntity news) {
//        return newsMapper.update(news);
//    }
//
//    public int deleteNews(Long id) {
//        return newsMapper.delete(id);
//    }
}
