package com.group1.oopproject.form.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "forms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Form {

    @Id
    private String id;
    private String name;
    private String assignedTo;
    private String assignedBy;
    private String formType;
    private Status status;
    private ApprovalStatus approvalStatus;
    private Document fields;

    @CreatedDate
    private LocalDateTime createdAt;

}
