package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CarResponse;
import com.example.digitalservicebook.car.dto.CreateCarRequest;

public class CarMapper {

    public static CarResponse toResponse(Car car) {
        return new CarResponse(
                car.getId(),
                car.getName(),
                car.getLicensePlate(),
                car.getImageUrl(),
                car.getNextServiceDate(),
                car.getStatus()
        );
    }

    public static Car toEntity(CreateCarRequest request) {
        Car car = new Car();
        car.setName(request.getName());
        car.setLicensePlate(request.getLicensePlate());
        car.setImageUrl(request.getImageUrl());
        car.setNextServiceDate(request.getNextServiceDate());
        car.setStatus(CarStatus.OK);
        return car;
    }
}