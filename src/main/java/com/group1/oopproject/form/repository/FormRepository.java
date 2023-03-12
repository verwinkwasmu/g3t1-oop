package com.group1.oopproject.form.repository;

import java.util.List;
import java.util.Optional;

import com.group1.oopproject.form.entity.WorkflowStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.group1.oopproject.form.entity.Form;

public interface FormRepository extends MongoRepository<Form, String> {

    Optional<Form> findById(String id);

    List<Form> findByAssignedTo(String assignedTo);

    List<Form> findByWorkflowStatus(WorkflowStatus approvalStatus);

    void deleteById(String id);
}
