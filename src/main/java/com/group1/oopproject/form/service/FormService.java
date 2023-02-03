package com.group1.oopproject.form.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.FormNotFoundException;
import com.group1.oopproject.form.entity.Form;
import com.group1.oopproject.form.repository.FormRepository;

@Service
public class FormService {

    @Autowired
    private FormRepository formRepository;

    public List<Form> findAllForms() {
        try {
            List<Form> forms = formRepository.findAll();
            if (forms.isEmpty()) {
                throw new FormNotFoundException("No forms found in the database");
            }
            return forms;
        } catch (FormNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public Form findById(String id) throws FormNotFoundException {
        try {
            Optional<Form> form = formRepository.findById(id);
            return form.orElseThrow(() -> new FormNotFoundException("Form not found with id: " + id));
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public Form createForm(Form form) throws DatabaseCommunicationException {
        try {
            form.setCreatedAt(LocalDateTime.now());
            return formRepository.save(form);
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with the database while creating the user",
                    e);
        }
    }

}
