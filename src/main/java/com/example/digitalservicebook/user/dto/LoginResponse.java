package com.example.digitalservicebook.user.dto;

import lombok.Value;

@Value
public class LoginResponse {
    String token;
    Long id;
    String userName;
    String role;
}