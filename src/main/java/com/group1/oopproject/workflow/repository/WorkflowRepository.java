package com.group1.oopproject.workflow.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group1.oopproject.workflow.entity.Workflow;

public interface WorkflowRepository extends MongoRepository<Workflow, String> {

    Optional<Workflow> findById(String id);

}
