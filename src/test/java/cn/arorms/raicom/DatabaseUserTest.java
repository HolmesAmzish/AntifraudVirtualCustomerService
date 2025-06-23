package cn.arorms.raicom;

import cn.arorms.raicom.entity.UserEntity;
import cn.arorms.raicom.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class DatabaseUserTest {
    @Autowired
    private UserService userService;

    @Test
    public void getAllUsersFromDatabase() {
        UserEntity result = userService.getUserByUsername("admin");
        System.out.println(result);
    }
}
