package com.group1.oopproject.workflow.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.group1.oopproject.workflow.entity.ApproverReviewStatus;
import com.group1.oopproject.workflow.entity.AssignedWorkflow;

public interface AssignedWorkflowRepository extends MongoRepository<AssignedWorkflow, String> {

    Optional<AssignedWorkflow> findById(String id);

    ArrayList<AssignedWorkflow> findByApproverReviewStatus(ApproverReviewStatus approverReviewStatus);


}
