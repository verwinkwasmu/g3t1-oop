package com.group1.oopproject.user.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.group1.oopproject.user.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findById(String Id);
}
