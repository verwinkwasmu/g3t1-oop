package com.group1.oopproject.workflow.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.group1.oopproject.form.entity.Form;
import com.group1.oopproject.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "workflow")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Workflow {

    @Id
    private String id;
    private String workflowName;
    
    // @DocumentReference
    // private List <Form> workflowList;  

    // @DocumentReference
    // private User attachedUser;

    private String attachedUserId; 
    
    @CreatedDate
    private LocalDateTime createdAt;

}
