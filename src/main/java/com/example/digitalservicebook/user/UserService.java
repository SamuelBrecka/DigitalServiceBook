package com.example.digitalservicebook.user;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.digitalservicebook.car.Car;
import com.example.digitalservicebook.car.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(CreateUserRequest userRequest) {
        User user = userMapper.toEntity(userRequest, passwordEncoder);
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<Car> getUserCars(Long userId) {
        return carRepository.findByOwnerId(userId);
    }

    public User login(String username, String rawPassword) {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("Používateľ neexistuje"));

        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Nesprávne heslo!");
        }
    }
}