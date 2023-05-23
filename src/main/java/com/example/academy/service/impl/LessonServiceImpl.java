package com.example.academy.service.impl;

import com.example.academy.model.Lesson;
import com.example.academy.repository.LessonRepository;
import com.example.academy.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonServiceImpl implements LessonService {
    @Autowired
    private LessonRepository lessonRepository;

    @Override
    public Lesson findById(Long id) {
        return lessonRepository.findById(id).orElseThrow(() -> new IllegalStateException("Couldn't find this lesson"));
    }

    @Override
    public void delete(Lesson lesson) {
        lessonRepository.delete(lesson);
    }
}
