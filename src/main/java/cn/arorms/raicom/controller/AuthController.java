package cn.arorms.raicom.controller;

import cn.arorms.raicom.dto.LoginRequest;
import cn.arorms.raicom.dto.RegisterRequest;
import cn.arorms.raicom.entity.UserEntity;
import cn.arorms.raicom.service.TokenProvider;
import cn.arorms.raicom.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    // 登录接口
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        UserEntity user = userService.loadUserByUsername(request.getUsername());

        if (!passwordMatches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("用户名或密码错误");
        }

        String token = tokenProvider.generateToken(user.getUsername());

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .build();
    }

    // 注册接口
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        UserEntity user = userService.registerUser(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
        );

        String token = tokenProvider.generateToken(user.getUsername());

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .body("注册成功");
    }

    // 假设这是验证密码的方法（实际应使用 BCryptPasswordEncoder.matches）
    private boolean passwordMatches(String raw, String encoded) {
        return raw.equals(encoded); // 实际应使用 encoder.matches(raw, encoded)
    }
}