package com.example.academy.repository;

import com.example.academy.model.LectureQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureQuestionRepository extends JpaRepository<LectureQuestion, Long> {
}
