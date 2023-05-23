package com.example.academy.service;

import com.example.academy.model.Bill;
import com.example.academy.model.Course;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BillService {
    Bill findById(Long id);
    void create(Bill bill);

    List<Bill> findAll();
//    List<Course> findTopCourse(int n);
}
