package com.example.digitalservicebook.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {

    @Query("SELECT c FROM Car c WHERE c.user.id = :userId")
    List<Car> findByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM Car c WHERE c.name = :name AND c.user.id = :userId")
    Car findByNameAndUserId(@Param("name") String name, @Param("userId") Long userId);
}