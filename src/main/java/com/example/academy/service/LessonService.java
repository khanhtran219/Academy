package com.example.academy.service;

import com.example.academy.model.Lesson;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LessonService {
    Lesson findById(Long id);
    void delete(Lesson lesson);
}
