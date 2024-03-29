package com.group1.oopproject.workflow.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.group1.oopproject.questionnaire.entity.Questionnaire;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String workflowDescription;
    private List<String> questionnaireList = new ArrayList<String>();

    private List<Questionnaire> questionnaires;

    @CreatedDate
    private LocalDateTime createdAt;
}
