package com.example.digitalservicebook.user;

import com.example.digitalservicebook.car.Car;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private String firstName;
    private String lastName;

    private String userName;
    private String password;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Car> cars;
}