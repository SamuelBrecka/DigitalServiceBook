package com.example.digitalservicebook.car;

import lombok.Value;

import java.time.LocalDate;

@Value
public class CreateCarRequest {
    String vin;
    String licensePlate;
    String brand;
    String model;

    int manufactureYear;
    double engineCapacity;
    FuelType fuelType;
    String color;
    int mileage;

    LocalDate lastServiceDate;
    LocalDate nextStkDate;
    long ownerId;
}
