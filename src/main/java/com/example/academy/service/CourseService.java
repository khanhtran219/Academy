package com.example.academy.service;

import com.example.academy.model.Course;
import com.example.academy.model.Lesson;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CourseService {
    public Course findById(Long id);
    public void removeById(Long id);
    public void saveCourse(Course course);
    List<Course> findAll();
    List<Course> findCoursesActive();
    void deleteLesson(Course course, Lesson lesson);

    List<Course> findAllByUserIdAndActive(Long id);

    List<Course> findCourseActiveByKeyWord(String keyword);

    List<Course> findByKeyWord(String keyword);

    List<Course> findRandomActiveCourses();
}
