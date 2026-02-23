package com.example.digitalservicebook.car;

import com.example.digitalservicebook.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "cars")
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String vin;
    private String licensePlate;
    private String brand;
    private String model;

    private int manufactureYear;
    private double engineCapacity;
    private FuelType fuelType;
    private String color;
    private int mileage;

    private LocalDate lastServiceDate;
    private LocalDate nextStkDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User owner;

}

enum FuelType {
    Diesel,
    Gasoline,
    LPG,
    Electro
}
