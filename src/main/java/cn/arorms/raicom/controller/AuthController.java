package cn.arorms.raicom.controller;

import cn.arorms.raicom.config.PasswordEncoderConfig;
import cn.arorms.raicom.dto.LoginRequest;
import cn.arorms.raicom.dto.RegisterRequest;
import cn.arorms.raicom.entity.UserEntity;
import cn.arorms.raicom.service.TokenProvider;
import cn.arorms.raicom.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        log.info("login user: {}", username);
        UserEntity user = userService.getUserByUsername(username);
        if (!passwordMatches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
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
        return passwordEncoder.matches(raw, encoded);
    }
}