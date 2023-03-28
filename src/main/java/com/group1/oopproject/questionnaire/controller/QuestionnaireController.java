package com.group1.oopproject.questionnaire.controller;

import java.time.LocalDateTime;
import java.util.List;

import com.group1.oopproject.exception.ApiErrorResponse;
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
    public ResponseEntity<?> findAllQuestionnaire() {
        try {
            return ResponseEntity.ok(questionnaireService.findAllQuestionnaire());
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(questionnaireService.findById(id));
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createQuestionnaire(@RequestBody Questionnaire questionnaire) {
        try {
            return ResponseEntity.ok(questionnaireService.createQuestionnaire(questionnaire));
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/vendor/{id}")
    public ResponseEntity<?> findByAssignedVendor(@PathVariable String id) {
        try {
            return ResponseEntity.ok(questionnaireService.findByAssignedVendor(id));
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<?> findByAssignedAdmin(@PathVariable String id) {
        try {
            return ResponseEntity.ok(questionnaireService.findByAssignedAdmin(id));
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/delete/{id}/{userId}")
    public ResponseEntity<?> deleteById(@PathVariable("id") String id, @PathVariable("userId") String userId) {
        try {
            questionnaireService.deleteById(id, userId);
            return ResponseEntity.noContent().build();
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateQuestionnaire(@RequestBody Questionnaire updatedQuestionnaire){
        try {
            return ResponseEntity.ok(questionnaireService.updateQuestionnaire(updatedQuestionnaire));
        } catch (QuestionnaireNotFoundException e){
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e){
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> findAllByStatus(@PathVariable String status) {
        try {
            return ResponseEntity.ok(questionnaireService.findAllByStatus(QuestionnaireStatus.valueOf(status)));
        } catch (QuestionnaireNotFoundException e) {
            logger.error("QuestionnaireNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
