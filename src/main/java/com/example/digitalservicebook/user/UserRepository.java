package com.example.digitalservicebook.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Tu nemusíš písať nič! Spring za teba vygeneruje metódy
    // ako save(), findAll(), deleteById()...
}
