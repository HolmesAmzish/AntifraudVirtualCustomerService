package cn.arorms.raicom.mapper;

import cn.arorms.raicom.entity.NewsEntity;
import java.util.List;

public interface NewsMapper {
    List<NewsEntity> findAll();
    NewsEntity findById(Long id);
//    int insert(NewsEntity news);
//    int update(NewsEntity news);
//    int delete(Long id);
}
