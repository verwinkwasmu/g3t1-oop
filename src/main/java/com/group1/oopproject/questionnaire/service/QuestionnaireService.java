package com.group1.oopproject.questionnaire.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.group1.oopproject.archive.entity.ArchiveDocument;
import com.group1.oopproject.archive.service.ArchiveService;
import com.group1.oopproject.exception.QuestionnaireNotFoundException;
import com.group1.oopproject.questionnaire.entity.Questionnaire;
import com.group1.oopproject.questionnaire.entity.QuestionnaireStatus;
import com.group1.oopproject.questionnaire.repository.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import com.group1.oopproject.exception.DatabaseCommunicationException;

@Service
public class QuestionnaireService {

    @Autowired
    private QuestionnaireRepository questionnaireRepository;

    @Autowired
    private ArchiveService archiveService;

    public List<Questionnaire> findAllQuestionnaire() {
        try {
            List<Questionnaire> questionnaires = questionnaireRepository.findAll();
            if (questionnaires.isEmpty()) {
                throw new QuestionnaireNotFoundException("No questionnaires found in the database");
            }
            return questionnaires;
        } catch (QuestionnaireNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findAllQuestionnaire", e);
        }
    }

    public Questionnaire findById(String id) {
        try {
            Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);
            return questionnaire.orElseThrow(() -> new QuestionnaireNotFoundException("Questionnaire not found with id: " + id));
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findById", e);
        }
    }

    public Questionnaire createQuestionnaire(Questionnaire questionnaire) {
        try {
            questionnaire.setCreatedAt(LocalDateTime.now());
            return questionnaireRepository.save(questionnaire);
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with the database for method createQuestionnaire",
                    e);
        }
    }

    public List<Questionnaire> findByAssignedVendor(String assignedVendor) {
        try {
            List<Questionnaire> questionnaires = questionnaireRepository.findByAssignedVendorId(assignedVendor);
            if (questionnaires.isEmpty()) {
                throw new QuestionnaireNotFoundException("No questionnaires found in the database for vendor with id: " + assignedVendor);
            }
            return questionnaires;
        } catch (QuestionnaireNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findByAssignedVendor",
                    e);
        }
    }

    public List<Questionnaire> findByAssignedAdmin(String assignedAdmin) {
        try {
            List<Questionnaire> questionnaires = questionnaireRepository.findByAssignedAdminId(assignedAdmin);
            if (questionnaires.isEmpty()) {
                throw new QuestionnaireNotFoundException("No questionnaires found in the database for admin with id: " + assignedAdmin);
            }
            return questionnaires;
        } catch (QuestionnaireNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findByAssignedAdmin",
                    e);
        }
    }

    public void deleteById(String id, String userId) {
        try {
            Questionnaire questionnaire = questionnaireRepository.findById(id)
                    .orElseThrow(() -> new QuestionnaireNotFoundException("No questionnaire found in the database with id: " + id));
            questionnaireRepository.deleteById(questionnaire.getId());

            // archive this document
            archiveService.createArchiveDocument(ArchiveDocument.builder().id(questionnaire.getId()).collection("questionnaires").deletedBy(userId).data(questionnaire).build());

        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById: " + e.getMessage(), e);
        }
    }

    public Questionnaire updateQuestionnaire(Questionnaire questionnaire) {
        try {
            // Check if form exists
            if (questionnaireRepository.findById(questionnaire.getId()).isPresent()){
                // UPDATE
                return questionnaireRepository.save(questionnaire);
            } else {
                throw new QuestionnaireNotFoundException("No questionnaire found in the database with id: " + questionnaire.getId());
            }
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method updateById", e);
        }
    }

    public List<Questionnaire> findAllByStatus(QuestionnaireStatus status) {
        try {
            List<Questionnaire> questionnaires = questionnaireRepository.findByStatus(status);
            if (questionnaires.isEmpty()) {
                throw new QuestionnaireNotFoundException("No questionnaires found in the database for status of: " + status);
            }
            return questionnaires;
        } catch (QuestionnaireNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findAllByStatus",
                    e);
        }
    }
}
