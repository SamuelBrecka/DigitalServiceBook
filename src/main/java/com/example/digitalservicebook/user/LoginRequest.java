package com.example.digitalservicebook.user;

import lombok.Value;

@Value
public class LoginRequest {
    String userName;
    String password;
}
