package com.group1.oopproject.user.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group1.oopproject.user.entity.User;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findById(String Id);

    
    void deleteUser(String id);
}
