package com.group1.oopproject.form.controller;

import java.util.List;

import com.group1.oopproject.form.entity.FormStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.FormNotFoundException;
import com.group1.oopproject.form.entity.Form;
import com.group1.oopproject.form.service.FormService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1/form")
public class FormController {

    @Autowired
    private FormService formService;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping
    public ResponseEntity<List<Form>> findAllForms() {
        try {
            return ResponseEntity.ok(formService.findAllForms());
        } catch (FormNotFoundException e) {
            logger.error("FormNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Form> findById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(formService.findById(id));
        } catch (FormNotFoundException e) {
            logger.error("FormNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Form> createForm(@RequestBody Form form) {
        try {
            return ResponseEntity.ok(formService.createForm(form));
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Form>> findByAssignedTo(@PathVariable String id) {
        try {
            return ResponseEntity.ok(formService.findByAssignedTo(id));
        } catch (FormNotFoundException e) {
            logger.error("FormNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        try {
            formService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (FormNotFoundException e) {
            logger.error("FormNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Form> updateForm(@RequestBody Form updatedForm){
        try {
            return ResponseEntity.ok(formService.updateForm(updatedForm));
        } catch (FormNotFoundException e){
            logger.error("FormNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e){
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/formStatus/{formStatus}")
    public ResponseEntity<List<Form>> getFormsByFormStatus(@PathVariable String formStatus) {
        try {
            return ResponseEntity.ok(formService.getFormsByFormStatus(FormStatus.valueOf(formStatus)));
        } catch (FormNotFoundException e) {
            logger.error("FormNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("DatabaseCommunicationException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
