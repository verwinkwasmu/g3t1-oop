package com.group1.oopproject.archive.service;


import com.group1.oopproject.archive.entity.ArchiveDocument;
import com.group1.oopproject.archive.repository.ArchiveRepository;
import com.group1.oopproject.exception.ArchiveDocumentNotFoundException;
import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.questionnaire.entity.Questionnaire;
import com.group1.oopproject.questionnaire.repository.QuestionnaireRepository;
import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ArchiveService {

    @Autowired
    private ArchiveRepository archiveRepository;
    @Autowired
    private QuestionnaireRepository questionnaireRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ArchiveDocument> findArchiveDocumentByCollection(String collection) {
        try {
            List<ArchiveDocument> archiveDocuments = archiveRepository.findByCollection(collection);
            if (archiveDocuments.isEmpty()) {
                throw new ArchiveDocumentNotFoundException("No archive documents found in the database");
            }
            return archiveDocuments;
        } catch (ArchiveDocumentNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findArchiveDocumentByCollection: " + e.getMessage(), e);
        }
    }

    public void restoreDocument(String id) {
        try {
            // Find the archived document by ID
            Optional<ArchiveDocument> archivedDocument = archiveRepository.findById(id);
            if (archivedDocument.isPresent()) {
                // Get the original collection name and document data
                String collection = archivedDocument.get().getCollection();
                Object data = archivedDocument.get().getData();

                // Create a new document in the original collection with the same data
                switch (collection){
                    case "questionnaires":
                        questionnaireRepository.save((Questionnaire) data);
                        break;
                    case "users":
                        userRepository.save((User) data);
                        break;
                    //TODO add workflow
                    // TODO add assignedWorkflow
                }

                // Delete the archived document from the archived collection
                archiveRepository.deleteById(id);
            } else {
                throw new ArchiveDocumentNotFoundException("No archive document found in the database with id: " + id);
            }
        } catch (Exception e){
            throw new DatabaseCommunicationException("Error communicating with database for method restoreDocument: " + e.getMessage(), e);
        }
    }

    public ArchiveDocument createArchiveDocument(ArchiveDocument archiveDocument) {
        try {
            archiveDocument.setDeletedAt(LocalDateTime.now());
            return archiveRepository.save(archiveDocument);
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with the database for method createArchiveDocument: " + e.getMessage(),
                    e);
        }
    }
}
