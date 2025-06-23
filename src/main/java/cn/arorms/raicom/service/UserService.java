package cn.arorms.raicom.service;

import cn.arorms.raicom.entity.UserEntity;
import cn.arorms.raicom.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * UserService
 * @version 1.0 2025-06-20
 * @author Amzish
 */
@Service
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity registerUser(String username, String email, String rawPassword) {
        if (userMapper.getUserByUsername(username) != null) {
            throw new RuntimeException("Username is already in use.");
        }

        if (userMapper.getUserByEmail(email) != null) {
            throw new RuntimeException("Email is already in use.");
        }

        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));

        userMapper.insertUser(user);
        return user;
    }

    public List<UserEntity> getUsers() {
        return userMapper.getUsers();
    }

    public UserEntity getUserByUsername(String username) {
        UserEntity user = userMapper.getUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("Invalid username or password.");
        }
        return user;
    }
}