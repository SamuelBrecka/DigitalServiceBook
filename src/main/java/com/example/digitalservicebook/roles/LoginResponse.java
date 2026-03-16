package com.example.digitalservicebook.roles;

import lombok.Value;

@Value
public class LoginResponse {
    String token;
    Long id;
    String userName;
    String role;
}