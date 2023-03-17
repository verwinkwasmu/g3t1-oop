package com.group1.oopproject.workflow.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Document(collection = "workflow")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Workflow {

    @Id
    private String id;
    private String workflowName;
    private String[] workflowList;
        
    @CreatedDate
    private LocalDateTime createdAt;

}
