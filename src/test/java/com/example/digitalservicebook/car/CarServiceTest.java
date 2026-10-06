package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CarResponse;
import com.example.digitalservicebook.car.dto.UpdateCarRequest;
import com.example.digitalservicebook.user.User;
import com.example.digitalservicebook.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

    @Mock
    private CarRepository carRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CarService carService;

    private User user;
    private Car existingCar;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(10L);
        user.setEmail("user@example.com");

        existingCar = new Car();
        existingCar.setId(1L);
        existingCar.setUser(user);
        existingCar.setName("Old Name");
        existingCar.setLicensePlate("AA-111AA");
        existingCar.setImageUrl("data:image/jpeg;base64,existingImage");
        existingCar.setNextServiceDate(LocalDate.now().plusMonths(6));
        existingCar.setStatus(CarStatus.OK);
    }

    @Test
    void updateCar_whenImageUrlIsNull_preservesExistingImage() {
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(carRepository.findById(1L)).thenReturn(Optional.of(existingCar));
        when(carRepository.save(any(Car.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateCarRequest request = new UpdateCarRequest();
        request.setName("New Name");
        request.setLicensePlate("BB-222BB");
        request.setNextServiceDate(LocalDate.now().plusMonths(3));
        request.setImageUrl(null); // No new image provided

        CarResponse response = carService.updateCar(1L, request, "user@example.com");

        assertEquals("New Name", response.getName());
        assertEquals("BB-222BB", response.getLicensePlate());
        assertEquals("data:image/jpeg;base64,existingImage", response.getImageUrl());
    }

    @Test
    void updateCar_whenImageUrlProvided_updatesImage() {
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(carRepository.findById(1L)).thenReturn(Optional.of(existingCar));
        when(carRepository.save(any(Car.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateCarRequest request = new UpdateCarRequest();
        request.setName("New Name");
        request.setLicensePlate("BB-222BB");
        request.setNextServiceDate(LocalDate.now().plusMonths(3));
        request.setImageUrl("data:image/jpeg;base64,newImage");

        CarResponse response = carService.updateCar(1L, request, "user@example.com");

        assertEquals("data:image/jpeg;base64,newImage", response.getImageUrl());
    }

    @Test
    void updateCar_whenImageUrlIsEmpty_clearsImage() {
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(carRepository.findById(1L)).thenReturn(Optional.of(existingCar));
        when(carRepository.save(any(Car.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateCarRequest request = new UpdateCarRequest();
        request.setName("New Name");
        request.setLicensePlate("BB-222BB");
        request.setNextServiceDate(LocalDate.now().plusMonths(3));
        request.setImageUrl(""); // Explicitly clear image

        CarResponse response = carService.updateCar(1L, request, "user@example.com");

        assertNull(response.getImageUrl());
    }
}
