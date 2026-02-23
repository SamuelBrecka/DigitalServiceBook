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
        this.userRepository.save(this.userMapper.toEntity(userRequest));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<Car> getUserCars(Long userId) {
        return carRepository.findByOwnerId(userId);
    }
}