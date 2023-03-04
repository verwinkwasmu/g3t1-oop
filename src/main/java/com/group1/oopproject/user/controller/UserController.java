package com.group1.oopproject.user.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.UserNotFoundException;
import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    private Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (UserNotFoundException e) {
            logger.error("UserNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(userService.findUserById(id));
        } catch (UserNotFoundException e) {
            logger.error("UserNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.createUser(user));
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (UserNotFoundException e) {
            logger.error("UserNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser){
        try {
            return ResponseEntity.ok(userService.updateUser(updatedUser));
        } catch (UserNotFoundException e){
            logger.error("UserNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e){
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
