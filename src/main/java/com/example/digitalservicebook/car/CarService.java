package com.example.digitalservicebook.car;

import com.example.digitalservicebook.user.User;
import com.example.digitalservicebook.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final CarMapper carMapper;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public void addCar(CreateCarRequest request) {
        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Majiteľ neexistuje"));

        Car car = carMapper.toCar(request);
        car.setOwner(owner);

        carRepository.save(car);
    }

    public void deleteCar(Long id) {
        this.carRepository.deleteById(id);
    }
}
