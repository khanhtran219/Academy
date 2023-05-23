package com.example.academy.repository;

import com.example.academy.model.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    List<ExamResult> findAllByExamIdAndUserId(Long examId, Long userId);
}
