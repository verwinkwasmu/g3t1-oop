package com.group1.oopproject.workflow.entity;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Document(collection = "assignedWorkflow")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class AssignedWorkflow extends Workflow {

    private String assignedVendorId; 
    private String assignedAdminId;
    private LocalDateTime approvalRequestDate;
    private ApproverReviewStatus approverReviewStatus;
    private LocalDateTime approvedAt; 
}
