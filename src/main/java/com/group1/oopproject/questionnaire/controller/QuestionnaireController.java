package com.group1.oopproject.questionnaire.controller;

import java.util.List;

import com.group1.oopproject.exception.QuestionnaireNotFoundException;
import com.group1.oopproject.questionnaire.entity.Questionnaire;
import com.group1.oopproject.questionnaire.entity.QuestionnaireStatus;
import com.group1.oopproject.questionnaire.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group1.oopproject.exception.DatabaseCommunicationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1/questionnaire")
public class QuestionnaireController {

    @Autowired
    private QuestionnaireService questionnaireService;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping
    public ResponseEntity<List<Questionnaire>> findAllQuestionnaire() {
        try {
            return ResponseEntity.ok(questionnaireService.findAllQuestionnaire());
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Questionnaire> findById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(questionnaireService.findById(id));
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Questionnaire> createQuestionnaire(@RequestBody Questionnaire questionnaire) {
        try {
            return ResponseEntity.ok(questionnaireService.createQuestionnaire(questionnaire));
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/vendor/{id}")
    public ResponseEntity<List<Questionnaire>> findByAssignedVendor(@PathVariable String id) {
        try {
            return ResponseEntity.ok(questionnaireService.findByAssignedVendor(id));
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<List<Questionnaire>> findByAssignedAdmin(@PathVariable String id) {
        try {
            return ResponseEntity.ok(questionnaireService.findByAssignedAdmin(id));
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}/{userId}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") String id, @PathVariable("userId") String userId) {
        try {
            questionnaireService.deleteById(id, userId);
            return ResponseEntity.noContent().build();
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Questionnaire> updateQuestionnaire(@RequestBody Questionnaire updatedQuestionnaire){
        try {
            return ResponseEntity.ok(questionnaireService.updateQuestionnaire(updatedQuestionnaire));
        } catch (QuestionnaireNotFoundException e){
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e){
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Questionnaire>> findAllByStatus(@PathVariable String status) {
        try {
            return ResponseEntity.ok(questionnaireService.findAllByStatus(QuestionnaireStatus.valueOf(status)));
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
