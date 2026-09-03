package com.example.digitalservicebook.car;

import com.example.digitalservicebook.car.dto.CarResponse;
import com.example.digitalservicebook.car.dto.CreateCarRequest;
import com.example.digitalservicebook.user.User;
import com.example.digitalservicebook.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CarResponse> getCarsByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return carRepository.findByUserId(user.getId()).stream()
                .map(CarMapper::toResponse)
                .collect(Collectors.toList());
    }

    public CarResponse getCarById(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        if (!car.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        return CarMapper.toResponse(car);
    }

    public CarResponse createCar(CreateCarRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Car car = CarMapper.toEntity(request);
        car.setUser(user);
        Car saved = carRepository.save(car);
        return CarMapper.toResponse(saved);
    }

    public void deleteCar(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        if (!car.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        carRepository.delete(car);
    }
}