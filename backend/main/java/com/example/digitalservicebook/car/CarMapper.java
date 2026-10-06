package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CarResponse;
import com.example.digitalservicebook.car.dto.CreateCarRequest;

import java.time.LocalDate;

public class CarMapper {

    public static CarStatus calculateStatus(LocalDate nextServiceDate) {
        if (nextServiceDate == null) {
            return CarStatus.OK;
        }
        LocalDate today = LocalDate.now();
        if (nextServiceDate.isBefore(today)) {
            return CarStatus.ISSUE;
        } else if (!nextServiceDate.isAfter(today.plusDays(30))) {
            return CarStatus.WARNING;
        } else {
            return CarStatus.OK;
        }
    }

    public static CarResponse toResponse(Car car) {
        return new CarResponse(
                car.getId(),
                car.getName(),
                car.getLicensePlate(),
                car.getImageUrl(),
                car.getNextServiceDate(),
                calculateStatus(car.getNextServiceDate())
        );
    }

    public static Car toEntity(CreateCarRequest request) {
        Car car = new Car();
        car.setName(request.getName());
        car.setLicensePlate(request.getLicensePlate());
        car.setImageUrl(request.getImageUrl());
        car.setNextServiceDate(request.getNextServiceDate());
        car.setStatus(calculateStatus(request.getNextServiceDate()));
        return car;
    }
}