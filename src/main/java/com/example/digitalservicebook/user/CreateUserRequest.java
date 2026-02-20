package com.example.digitalservicebook.user;

import lombok.Value;

@Value
public class CreateUserRequest {
    String firstName;
    String lastName;
    int age;
}
