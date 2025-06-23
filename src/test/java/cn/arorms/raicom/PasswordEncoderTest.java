package cn.arorms.raicom;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class PasswordEncoderTest {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Test
    void generateEncodedPassword() {
        String password = "123123";
        String encodedPassword = passwordEncoder.encode(password);
        System.out.printf("encodedPassword: %s%n", encodedPassword);
    }
}
