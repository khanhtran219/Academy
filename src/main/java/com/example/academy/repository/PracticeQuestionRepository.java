package com.example.academy.repository;

import com.example.academy.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PracticeQuestionRepository extends JpaRepository<Question,Long> {
}
