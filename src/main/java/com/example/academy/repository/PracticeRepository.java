package com.example.academy.repository;

import com.example.academy.model.Practice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PracticeRepository extends JpaRepository<Practice,Long> {
}
