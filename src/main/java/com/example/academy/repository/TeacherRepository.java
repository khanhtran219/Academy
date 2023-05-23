package com.example.academy.repository;

import com.example.academy.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,Long> {
    @Query("SELECT t FROM teacher t ORDER BY RAND() LIMIT 5")
    List<Teacher> findRandomActiveTeachers();
}
