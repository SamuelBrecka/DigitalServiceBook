package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CreateCarRequest;
import org.springframework.stereotype.Component;

@Component
public class CarMapper {
    public Car toCar(CreateCarRequest request) {
        Car newCar = new Car();
        newCar.setVin(request.getVin());
        newCar.setLicensePlate(request.getLicensePlate());
        newCar.setBrand(request.getBrand());
        newCar.setModel(request.getModel());

        newCar.setEngineCapacity(request.getEngineCapacity());
        newCar.setMileage(request.getMileage());
        newCar.setFuelType(request.getFuelType());
        newCar.setColor(request.getColor());
        newCar.setManufactureYear(request.getManufactureYear());

        newCar.setLastServiceDate(request.getLastServiceDate());
        newCar.setNextStkDate(request.getNextStkDate());

        return newCar;
    }
}
