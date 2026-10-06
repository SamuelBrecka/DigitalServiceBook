package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CarResponse;
import com.example.digitalservicebook.car.dto.CreateCarRequest;
import com.example.digitalservicebook.car.dto.UpdateCarRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping
    public ResponseEntity<List<CarResponse>> getAllCars(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(carService.getCarsByUserEmail(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarResponse> getCar(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(carService.getCarById(id, email));
    }

    @PostMapping
    public ResponseEntity<CarResponse> createCar(@RequestBody CreateCarRequest request, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(carService.createCar(request, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        carService.deleteCar(id, email);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarResponse> updateCar(@PathVariable Long id, @RequestBody UpdateCarRequest request, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(carService.updateCar(id, request, email));
    }
}