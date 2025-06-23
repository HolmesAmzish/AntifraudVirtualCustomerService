package cn.arorms.raicom.mapper;

import cn.arorms.raicom.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    UserEntity getUserByUsername(String username);
    UserEntity getUserByEmail(String email);
    List<UserEntity> getUsers();
    void insertUser(UserEntity user);
}
