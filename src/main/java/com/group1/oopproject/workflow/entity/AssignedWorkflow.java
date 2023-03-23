package com.group1.oopproject.workflow.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import javax.persistence.Entity;

@Document(collection = "assignedWorkflow")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class AssignedWorkflow extends Workflow {

    private String assignedVendorId; 
    private LocalDateTime submissionDeadline; 
    private LocalDateTime approvedAt; 
    private WorkflowStatus workflowStatus;
    
}
