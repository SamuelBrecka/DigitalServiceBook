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

        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
            User admin = new User();
            admin.setFirstName("admin");
            admin.setLastName("admin");
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(UserRole.ADMIN);

            userRepository.save(admin);
            System.out.println("Vytvorenie admina (admin / admin123).");
        }

        if (userRepository.findByEmail("user@user.com").isEmpty()) {
            User user = new User();
            user.setFirstName("Paľo");
            user.setLastName("Ščerba");
            user.setEmail("user@user.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole(UserRole.USER);

            userRepository.save(user);
            System.out.println("Vytvorenie predvoleneho pouzivatela (user / user123).");
        }
    }
}