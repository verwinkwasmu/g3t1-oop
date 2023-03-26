package com.group1.oopproject.questionnaire.entity;

import java.time.LocalDateTime;
import java.util.Map;

import org.bson.types.ObjectId;
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
    private QuestionnaireStatus status;
    private LocalDateTime submissionDate;
    private LocalDateTime submissionDeadline;
    private Map<String, Object> questionsAndAnswers;
    
    @CreatedDate
    private LocalDateTime createdAt;

}
