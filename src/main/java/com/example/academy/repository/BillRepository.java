package com.example.academy.repository;

import com.example.academy.model.Bill;
import com.example.academy.model.Course;
import com.example.academy.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill,Long> {
    @Query("SELECT DISTINCT b.user FROM bill b WHERE b.course.id = :courseId")
    List<User> findUsersByCourseId(@Param("courseId") Long courseId);
    @Query("SELECT DISTINCT b.course FROM bill b WHERE b.user.id = :userId")
    List<Course> findCoursesByUserId(@Param("userId") Long userId);

    @Query("SELECT b.course, COUNT(b) AS totalBills " +
            "FROM bill b " +
            "WHERE b.course.isActive = true " +
            "GROUP BY b.course " +
            "ORDER BY totalBills DESC " +
            "LIMIT :n")
    List<Object[]> findTopNCoursesWithMostBillsAndActive(@Param("n") int n);


}
