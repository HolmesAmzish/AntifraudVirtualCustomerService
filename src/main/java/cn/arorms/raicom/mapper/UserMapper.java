package cn.arorms.raicom.mapper;

import cn.arorms.raicom.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserEntity getUserByUsername(String username);
    UserEntity getUserByEmail(String email);
    void insertUser(UserEntity user);
}
