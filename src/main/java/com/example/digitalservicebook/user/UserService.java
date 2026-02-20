package com.example.digitalservicebook.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(CreateUserRequest userRequest) {
        userRepository.save(userMapper.toEntity(userRequest));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}