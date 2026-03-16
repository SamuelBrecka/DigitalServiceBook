package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CreateCarRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CarController {
    private final CarService carService;

    @GetMapping("/cars")
    public List<Car> getCars() {
        return this.carService.getAllCars();
    }

    @PostMapping("/cars")
    public void addCar(@RequestBody CreateCarRequest request) {
        this.carService.addCar(request);
    }

    @DeleteMapping("/cars/{id}")
    public void deleteCar(@PathVariable Long id) {
        this.carService.deleteCar(id);
    }
}
