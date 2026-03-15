package com.example.digitalservicebook.user;

import lombok.Value;

@Value
public class LoginResponse {
    String token;
    Long id;
    String userName;
}