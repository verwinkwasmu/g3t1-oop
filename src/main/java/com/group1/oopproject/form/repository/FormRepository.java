package com.group1.oopproject.form.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group1.oopproject.form.entity.Form;

public interface FormRepository extends MongoRepository<Form, String> {

    Optional<Form> findById(String id);
}
