package com.example.academy.repository;

import com.example.academy.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course,Long> {
    List<Course> findByIsActive(boolean isActive);
    List<Course> findByUsers_IdAndIsActiveTrue(Long userId);
    @Query("SELECT c FROM course c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) AND c.isActive = true")
    List<Course> searchActiveCoursesByKeyword(@Param("keyword") String keyword);
    List<Course> findByNameContainingIgnoreCase(String keyword);

    @Query("SELECT c FROM course c WHERE c.isActive = true ORDER BY RAND() LIMIT 5")
    List<Course> findRandomActiveCourses();
}
