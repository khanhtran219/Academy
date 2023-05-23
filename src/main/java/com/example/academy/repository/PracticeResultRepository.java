package com.example.academy.repository;

import com.example.academy.model.PracticeResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticeResultRepository extends JpaRepository<PracticeResult, Long> {
    List<PracticeResult> findByPracticeIdAndUserId(Long practiceId, Long userId);
}
