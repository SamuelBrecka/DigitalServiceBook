package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CreateCarRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cars")
public class CarController {
    private final CarService carService;

    @GetMapping()
    public List<Car> getCars(@RequestParam Long userId) {
        return this.carService.getAllUserCars(userId);
    }

    @PostMapping()
    public void addCar(@RequestBody CreateCarRequest request) {
        this.carService.addCar(request);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        this.carService.deleteCar(id);
    }
}
