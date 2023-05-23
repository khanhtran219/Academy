package com.example.academy.service;

import com.example.academy.exception.ChangePasswordException;
import com.example.academy.model.Course;
import com.example.academy.model.Level;
import com.example.academy.model.Role;
import com.example.academy.model.User;
import com.example.academy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService extends UserDetailsService {
    List<User> findAll();
    User findUserByEmail(String email);
    User saveUser(User user);
    User findById(Long id);
    User updateUser(User user);
    void setRoleById(Role role,Long id);
    void addCourse(Course course, User user);

    void changePassword(User user, String currentPassword, String newPassword, String confirmPassword) throws ChangePasswordException;

    void updateLevel(User user, Level level);

    void create(User user) throws Exception;
}
