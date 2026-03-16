package com.example.digitalservicebook.roles;

import lombok.Value;

@Value
public class LoginRequest {
    String userName;
    String password;
}
