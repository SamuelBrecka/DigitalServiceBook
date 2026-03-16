package com.example.digitalservicebook.security;

import com.example.digitalservicebook.user.User;
import com.example.digitalservicebook.user.UserRepository;
import com.example.digitalservicebook.user.UserRole; // Ak už máš ten Enum pre roly vytvorený
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.findByUserName("admin").isEmpty()) {
            User admin = new User();
            admin.setFirstName("admin");
            admin.setLastName("admin");
            admin.setUserName("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(UserRole.ADMIN);

            userRepository.save(admin);
            System.out.println("Vytvorenie admina (admin / admin123).");
        }

        if (userRepository.findByUserName("user").isEmpty()) {
            User user = new User();
            user.setFirstName("Paľo");
            user.setLastName("Ščerba");
            user.setUserName("user");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole(UserRole.USER);

            userRepository.save(user);
            System.out.println("Vytvorenie predvoleneho pouzivatela (user / user123).");
        }
    }
}