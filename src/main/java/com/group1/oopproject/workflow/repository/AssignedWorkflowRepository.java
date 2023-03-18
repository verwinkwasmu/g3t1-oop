package com.group1.oopproject.workflow.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group1.oopproject.workflow.entity.AssignedWorkflow;

public interface AssignedWorkflowRepository extends MongoRepository<AssignedWorkflow, String> {

    Optional<AssignedWorkflow> findById(String id);

}
