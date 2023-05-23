package com.example.academy.service.impl;

import com.example.academy.model.Bill;
import com.example.academy.model.Course;
import com.example.academy.repository.BillRepository;
import com.example.academy.repository.CourseRepository;
import com.example.academy.repository.UserRepository;
import com.example.academy.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private BillRepository billRepository;

    @Override
    public Bill findById(Long id) {
        Optional<Bill> optionalBill = billRepository.findById(id);
        if (optionalBill.isPresent()) {
            return optionalBill.get();
        } else {
            throw new RuntimeException("Bill not found with id: " + id);
        }
    }

    @Override
    public void create(Bill bill) {
        billRepository.save(bill);
    }

    @Override
    public List<Bill> findAll() {
        return billRepository.findAll();
    }

}
