package com.group1.oopproject.questionnaire.entity;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "questionnaires")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Questionnaire {

    @Id
    private String id;
    private String title;
    private String assignedVendorId;
    private String assignedAdminId;
    private AssignedTo assignedTo;
    private QuestionnaireStatus status;
    private LocalDateTime submissionDate;
    private Date submissionDeadline;
    private Map<String, Object> questionsAndAnswers;
    private List<String> feedback;
    
    @CreatedDate
    private LocalDateTime createdAt;

}
