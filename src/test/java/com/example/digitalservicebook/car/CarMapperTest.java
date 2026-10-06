package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CarResponse;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CarMapperTest {

    @Test
    void toResponse_whenServiceDateInPast_returnsIssueStatus() {
        Car car = new Car();
        car.setId(1L);
        car.setName("Test Car");
        car.setLicensePlate("AA-123BB");
        car.setNextServiceDate(LocalDate.now().minusDays(5));

        CarResponse response = CarMapper.toResponse(car);

        assertEquals(CarStatus.ISSUE, response.getStatus());
    }

    @Test
    void toResponse_whenServiceDateWithin30Days_returnsWarningStatus() {
        Car car = new Car();
        car.setId(2L);
        car.setName("Test Car 2");
        car.setLicensePlate("BB-456CC");
        car.setNextServiceDate(LocalDate.now().plusDays(10));

        CarResponse response = CarMapper.toResponse(car);

        assertEquals(CarStatus.WARNING, response.getStatus());
    }

    @Test
    void toResponse_whenServiceDateFarFuture_returnsOkStatus() {
        Car car = new Car();
        car.setId(3L);
        car.setName("Test Car 3");
        car.setLicensePlate("CC-789DD");
        car.setNextServiceDate(LocalDate.now().plusDays(60));

        CarResponse response = CarMapper.toResponse(car);

        assertEquals(CarStatus.OK, response.getStatus());
    }
}
