package com.example.digitalservicebook;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    private final UserService userService;

    public HelloController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String index() {
        return "<h1>Hello World!</h1><p>Tvoj prvý Spring Boot backend beží.</p>";
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public String createUser(@RequestBody User user) {
        userService.addUser(user);
        return "Používateľ " + user.getFirstName() + " bol úspešne pridaný!";
    }

    @GetMapping("/test")
    public String test() {
        return "Backend bezi!";
    }
}
