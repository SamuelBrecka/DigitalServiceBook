package com.example.digitalservicebook.user;

import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toEntity(CreateUserRequest request) {
        var userModel = new User();
        userModel.setFirstName(request.getFirstName());
        userModel.setLastName(request.getLastName());
        userModel.setAge(request.getAge());
        return userModel;
    }
}
