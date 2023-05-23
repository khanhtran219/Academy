package com.example.academy.service.impl;

import com.example.academy.model.Teacher;
import com.example.academy.repository.TeacherRepository;
import com.example.academy.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherServiceImpl implements TeacherService {
    @Autowired
    private TeacherRepository repository;

    @Override
    public List<Teacher> findAll() {
        return repository.findAll();
    }

    @Override
    public Teacher findById(Long id) {
        Optional<Teacher> teacher = repository.findById(id);
        if (teacher.isPresent()) {
            return teacher.get();
        } else {
            throw new RuntimeException("Teacher not found");
        }
    }

    @Override
    public void save(Teacher teacher) {
        repository.save(teacher);
    }

    @Override
    public void remove(Teacher teacher) {
        repository.delete(teacher);
    }

    @Override
    public List<Teacher> findRandomActiveTeachers() {
        return repository.findRandomActiveTeachers();
    }
}
