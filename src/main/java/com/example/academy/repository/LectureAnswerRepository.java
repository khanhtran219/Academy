package com.example.academy.repository;

import com.example.academy.model.LectureAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureAnswerRepository extends JpaRepository<LectureAnswer, Long> {
}
