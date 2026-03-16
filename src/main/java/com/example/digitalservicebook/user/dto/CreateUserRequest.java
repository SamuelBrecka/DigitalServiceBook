package com.example.digitalservicebook.user.dto;

import lombok.Value;

@Value
public class CreateUserRequest {
    String firstName;
    String lastName;
    String userName;
    String password;
}
