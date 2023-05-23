package com.example.academy.service.impl;

import com.example.academy.exception.ChangePasswordException;
import com.example.academy.model.Course;
import com.example.academy.model.Level;
import com.example.academy.model.Role;
import com.example.academy.model.User;
import com.example.academy.service.UserService;
import com.example.academy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Không tồn ta người dùng có email " + email));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        return user.get();
    }

    @Override
    public User saveUser(User user) {
        if (user.getAvatar() == null) {
            user.setAvatar("/static/img/avatars/6.png");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public User updateUser(User user) {
        User oldUser = findById(user.getId());
        if (!user.getPassword().equals(oldUser.getPassword())) {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
        }
        return userRepository.save(user);
    }


    @Override
    public void setRoleById(Role role, Long id) {
        User user = userRepository.findById(id).orElse(null);
        user.setRole(role);
        userRepository.save(user);
    }

    @Override
    public void addCourse(Course course, User user) {
        List<Course> courses = user.getCourses();
        courses.add(course);
        user.setCourses(courses);
        userRepository.save(user);
    }

    @Override
    public void changePassword(User user, String currentPassword, String newPassword, String confirmPassword) throws ChangePasswordException {
        String newPasswordEncoder = passwordEncoder.encode(newPassword);

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new ChangePasswordException("Incorrect current password");
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new ChangePasswordException("Incorrect confirm password");
        }

        user.setPassword(newPasswordEncoder);
        userRepository.save(user);
    }

    @Override
    public void updateLevel(User user, Level level) {
        user.setLevel(level);
        userRepository.save(user);
    }
    @Override
    public void create(User user) throws Exception {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email " + user.getEmail() + " already exists");
        }
        user.setAvatar("/static/img/avatars/6.png");
        user.setLevel(Level.Beginner);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);
    }
}
