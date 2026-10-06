package com.example.digitalservicebook.car.dto;

import com.example.digitalservicebook.car.CarStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarResponse {
    private Long id;
    private String name;
    private String licensePlate;
    private String imageUrl;
    private LocalDate nextServiceDate;
    private CarStatus status;
}