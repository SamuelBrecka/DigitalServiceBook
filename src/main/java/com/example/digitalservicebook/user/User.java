package com.example.digitalservicebook.user;

import com.example.digitalservicebook.car.Car;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String firstName;
    private String lastName;
    private int age;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Car> cars;
}