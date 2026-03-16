package com.example.digitalservicebook.car.dto;

import com.example.digitalservicebook.car.FuelType;
import lombok.Value;

import java.time.LocalDate;

@Value
public class CarResponse {
    String vin;
    String licensePlate;
    String brand;
    String model;

    Integer manufactureYear;
    Double engineCapacity;
    FuelType fuelType;
    String color;
    Integer mileage;

    LocalDate lastServiceDate;
    LocalDate nextStkDate;
    Long ownerId;
}
