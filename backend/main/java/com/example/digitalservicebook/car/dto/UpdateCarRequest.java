package com.example.digitalservicebook.car.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCarRequest {
    private String name;
    private String licensePlate;
    private String imageUrl;
    private LocalDate nextServiceDate;
}