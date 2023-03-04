package com.group1.oopproject.user.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import org.springframework.stereotype.Service;

import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.UserNotFoundException;
import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            if (users.isEmpty()) {
                throw new UserNotFoundException("No users found in the database");
            }
            return users;
        } catch (UserNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public User findUserById(String id) throws UserNotFoundException {
        try {
            Optional<User> user = userRepository.findById(id);
            return user.orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public User createUser(User user) throws DatabaseCommunicationException {
        try {
            user.setCreatedAt(LocalDateTime.now());
            return userRepository.save(user);
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with the database while creating the user",
                    e);
        }
    }

    public void deleteUser(String id) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("No users found in the database for user with id: " + id));
            userRepository.deleteById(user.getId());
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById", e);
        }
    }

    public User updateUser(User user) {
        try {
            // Check if user exists
            if (userRepository.findById(user.getId()).isPresent()){
                // UPDATE
                return userRepository.save(user);
            } else {
                throw new UserNotFoundException("No users found in the database for user with id: " + user.getId());
            }
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById", e);
        }
    }
}
