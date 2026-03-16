package com.example.digitalservicebook.user;

import com.example.digitalservicebook.config.JwtService;
import com.example.digitalservicebook.roles.LoginRequest;
import com.example.digitalservicebook.roles.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping()
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody CreateUserRequest user) {
        User savedUser = userService.addUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.login(request.getUserName(), request.getPassword());
            String token = jwtService.generateToken(user);

            LoginResponse response = new LoginResponse(
                    token,
                    user.getId(),
                    user.getUserName(),
                    user.getRole().toString()
            );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("Nesprávne prihlasovacie údaje");
        }
    }

    @GetMapping("/test")
    public String test() {
        return "Backend bezi!";
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
