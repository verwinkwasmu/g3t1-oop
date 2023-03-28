package com.group1.oopproject.archive.controller;


import com.group1.oopproject.archive.service.ArchiveService;
import com.group1.oopproject.exception.ApiErrorResponse;
import com.group1.oopproject.exception.ArchiveDocumentNotFoundException;
import com.group1.oopproject.exception.DatabaseCommunicationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1/archive")
public class ArchiveController {

    @Autowired
    private ArchiveService archiveService;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping("/collection/{collection}")
    public ResponseEntity<?> findArchiveDocumentByCollection(@PathVariable String collection){
        try {
            return ResponseEntity.ok(archiveService.findArchiveDocumentByCollection(collection));
        } catch (ArchiveDocumentNotFoundException e){
            logger.error("ArchiveDocumentNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e){
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/restoreDocument/{id}")
    public ResponseEntity<?> restoreDocument(@PathVariable String id){
        try {
            archiveService.restoreDocument(id);
            return ResponseEntity.ok("The document has been restored successfully.");
        } catch (ArchiveDocumentNotFoundException e){
            logger.error("ArchiveDocumentNotFoundException: {}", e.getMessage());
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(), "NOT_FOUND", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DatabaseCommunicationException e){
            ApiErrorResponse errorResponse = new ApiErrorResponse(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "INTERNAL_SERVER_ERROR", e.getMessage());
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
