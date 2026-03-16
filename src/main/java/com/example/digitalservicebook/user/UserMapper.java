package com.example.digitalservicebook.user;

import com.example.digitalservicebook.user.dto.CreateUserRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toEntity(CreateUserRequest request, PasswordEncoder passwordEncoder) {
        var userModel = new User();
        userModel.setFirstName(request.getFirstName());
        userModel.setLastName(request.getLastName());
        userModel.setUserName(request.getUserName());

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        userModel.setPassword(encodedPassword);
        return userModel;
    }
}
