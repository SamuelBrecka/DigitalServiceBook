package com.example.digitalservicebook.user.dto;

import lombok.Value;

@Value
public class LoginRequest {
    String userName;
    String password;
}
