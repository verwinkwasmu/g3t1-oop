package com.group1.oopproject.form.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.group1.oopproject.form.entity.FormStatus;
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
            throw new DatabaseCommunicationException("Error communicating with database for method findAllForms", e);
        }
    }

    public Form findById(String id) throws FormNotFoundException {
        try {
            Optional<Form> form = formRepository.findById(id);
            return form.orElseThrow(() -> new FormNotFoundException("Form not found with id: " + id));
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findById", e);
        }
    }

    public Form createForm(Form form) throws DatabaseCommunicationException {
        try {
            form.setCreatedAt(LocalDateTime.now());
            return formRepository.save(form);
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with the database for method createForm",
                    e);
        }
    }

    public List<Form> findByAssignedTo(String assignedTo) {
        try {
            List<Form> forms = formRepository.findByAssignedTo(assignedTo);
            if (forms.isEmpty()) {
                throw new FormNotFoundException("No forms found in the database for user with id: " + assignedTo);
            }
            return forms;
        } catch (FormNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findByAssignedTo",
                    e);
        }
    }

    public void deleteById(String id) {
        try {
            Form form = formRepository.findById(id)
                    .orElseThrow(() -> new FormNotFoundException("No forms found in the database for user with id: " + id));
            formRepository.deleteById(form.getId());
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById", e);
        }
    }

    public Form updateForm(Form form) {
        try {
            // Check if form exists
            if (formRepository.findById(form.getId()).isPresent()){
                // UPDATE
                return formRepository.save(form);
            } else {
                throw new FormNotFoundException("No forms found in the database for user with id: " + form.getId());
            }
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById", e);
        }
    }

    public List<Form> getFormsByFormStatus(FormStatus status) {
        try {
            List<Form> forms = formRepository.findByFormStatus(status);
            if (forms.isEmpty()) {
                throw new FormNotFoundException("No forms found in the database for approvalStatus of: " + status);
            }
            return forms;
        } catch (FormNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method getSubmittedForms",
                    e);
        }
    }
}
