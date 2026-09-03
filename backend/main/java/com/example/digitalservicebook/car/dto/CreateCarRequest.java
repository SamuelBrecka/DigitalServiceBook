package com.example.digitalservicebook.car.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCarRequest {
    private String name;
    private String licensePlate;
    private String imageUrl;
    private LocalDateTime nextServiceDate;
}