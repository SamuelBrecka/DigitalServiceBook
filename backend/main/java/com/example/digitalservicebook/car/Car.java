package com.example.digitalservicebook.car;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "license_plate", nullable = false)
    private String licensePlate;

    @Column(name = "image_url", nullable = true)
    private String imageUrl;

    @Column(name = "next_service_date", nullable = false)
    private LocalDateTime nextServiceDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CarStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private com.example.digitalservicebook.user.User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Version
    private Long version;
}