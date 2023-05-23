package com.example.academy.service.impl;

import com.example.academy.model.Course;
import com.example.academy.model.Lesson;
import com.example.academy.repository.CourseRepository;
import com.example.academy.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService{
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course findById(Long id) {
        return courseRepository.findById(id).get();
    }

    @Override
    public void removeById(Long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public void saveCourse(Course course) {
        if(course.getLessons().isEmpty()){
            course.setActive(false);
        }
        courseRepository.save(course);
    }

    @Override
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> findCoursesActive() {
        return courseRepository.findByIsActive(true);
    }

    @Override
    public void deleteLesson(Course course, Lesson lesson) {
        List<Lesson> lessons = course.getLessons();
        for(Lesson ls : lessons){
            if(ls.getId() == lesson.getId()){
                lessons.remove(ls);
                break;
            }
        }
        course.setLessons(lessons);
        saveCourse(course);
    }

    @Override
    public List<Course> findAllByUserIdAndActive(Long id) {
        return courseRepository.findByUsers_IdAndIsActiveTrue(id);
    }

    @Override
    public List<Course> findCourseActiveByKeyWord(String keyword) {
        List<Course> courses = courseRepository.searchActiveCoursesByKeyword(keyword);
        return courses;
    }

    @Override
    public List<Course> findByKeyWord(String keyword) {
        return courseRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public List<Course> findRandomActiveCourses() {
        return courseRepository.findRandomActiveCourses();
    }
}
