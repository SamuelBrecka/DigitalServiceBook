package com.example.digitalservicebook.user;

import com.example.digitalservicebook.car.Car;
import com.example.digitalservicebook.car.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final UserMapper userMapper;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(CreateUserRequest userRequest) {
        User user = userMapper.toEntity(userRequest);
        userRepository.save(user);

        // TEST: Skúsime ho hneď vytiahnuť z DB podľa zoznamu
        List<User> allUsers = userRepository.findAll();
        for (User u : allUsers) {
            System.out.println("Užívateľ v DB má ID: " + u.getId());
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<Car> getUserCars(Long userId) {
        return carRepository.findByOwnerId(userId);
    }
}