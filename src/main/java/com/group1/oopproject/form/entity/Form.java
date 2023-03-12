package com.group1.oopproject.form.entity;

import java.time.LocalDateTime;
import java.util.Map;

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
    private String email;
    private WorkflowStatus workflowStatus;
    private Map<String, Object> fields;

    @CreatedDate
    private LocalDateTime createdAt;

}
