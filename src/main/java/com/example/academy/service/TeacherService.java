package com.example.academy.service;

import com.example.academy.model.Teacher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeacherService {
    List<Teacher> findAll();
    Teacher findById(Long id);
    void save(Teacher teacher);
    void remove(Teacher teacher);

    List<Teacher> findRandomActiveTeachers();
}
