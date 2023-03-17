package com.group1.oopproject.workflow.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Document(collection = "assignedWorkflow")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class AssignedWorkflow extends Workflow {

    private String generatedFormId;
    private String assignedAdminId;
    private String assignedVendorId; 
    private WorkflowStatus workflowStatus;
    
}
