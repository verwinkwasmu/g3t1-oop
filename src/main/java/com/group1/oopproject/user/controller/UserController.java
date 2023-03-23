package com.group1.oopproject.user.controller;

import java.util.List;

import com.group1.oopproject.user.entity.Vendor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.UserNotFoundException;
import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.service.UserService;

@RestController
@CrossOrigin(origins="*")
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

    @GetMapping("/{userType}")
    public ResponseEntity<List<User>> getAllUsersByType(@PathVariable String userType) {
        try {
            return ResponseEntity.ok(userService.getAllUsersByType(userType));
        } catch (UserNotFoundException e) {
            logger.error("UserNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/vendors")
    public ResponseEntity<List<Vendor>> getAllVendors() {
        try {
            return ResponseEntity.ok(userService.getAllVendors());
        } catch (UserNotFoundException e) {
            logger.error("UserNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/vendors/{companyName}")
    public ResponseEntity<List<Vendor>> getAllVendorsByCompany(@PathVariable String companyName) {
        try {
            return ResponseEntity.ok(userService.getAllVendorsByCompany(companyName));
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

    @GetMapping("/vendors/{id}")
    public ResponseEntity<User> findVendorById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(userService.findVendorById(id));
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

    @PostMapping("/vendors/create")
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
        try {
            return ResponseEntity.ok(userService.createVendor(vendor));
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

    @DeleteMapping("/vendors/delete/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable String id) {
        try {
            userService.deleteVendor(id);
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

    @PutMapping("/vendors/update")
    public ResponseEntity<Vendor> updateVendor(@RequestBody Vendor updatedVendor){
        try {
            return ResponseEntity.ok(userService.updateVendor(updatedVendor));
        } catch (UserNotFoundException e){
            logger.error("UserNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e){
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}