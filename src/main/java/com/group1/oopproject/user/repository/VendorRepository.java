package com.group1.oopproject.user.repository;

import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.entity.Vendor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface VendorRepository extends MongoRepository<Vendor, String> {

    Optional<Vendor> findById(String Id);

    
    void deleteById(String id);
}