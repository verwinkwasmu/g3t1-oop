package com.group1.oopproject.questionnaire.repository;

import java.util.List;
import java.util.Optional;

import com.group1.oopproject.questionnaire.entity.Questionnaire;
import com.group1.oopproject.questionnaire.entity.QuestionnaireStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionnaireRepository extends MongoRepository<Questionnaire, String> {

    Optional<Questionnaire> findById(String id);

    List<Questionnaire> findByAssignedVendorId(String assignedVendorId);

    List<Questionnaire> findByAssignedAdminId(String assignedAdminId);

    List<Questionnaire> findByStatus(QuestionnaireStatus status);

    void deleteById(String id);
}
