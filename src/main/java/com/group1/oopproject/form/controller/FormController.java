package com.group1.oopproject.form.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.FormNotFoundException;
import com.group1.oopproject.form.entity.Form;

import com.group1.oopproject.form.service.FormService;

@RestController
@RequestMapping("/api/v1/forms")
public class FormController {

    @Autowired
    private FormService formService;

    @GetMapping
    public ResponseEntity<List<Form>> findAllForms() {
        try {
            return ResponseEntity.ok(formService.findAllForms());
        } catch (FormNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Form> findById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(formService.findById(id));
        } catch (FormNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Form> createForm(@RequestBody Form form) {
        try {
            return ResponseEntity.ok(formService.createForm(form));
        } catch (DatabaseCommunicationException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
