package com.example.digitalservicebook.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public String index() {
        return "<h1>Hello World!</h1><p>Tvoj prvý Spring Boot backend beží.</p>";
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public void createUser(@RequestBody CreateUserRequest user) {
        userService.addUser(user);
    }

    @GetMapping("/test")
    public String test() {
        return "Backend bezi!";
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
