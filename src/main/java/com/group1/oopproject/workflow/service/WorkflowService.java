package com.group1.oopproject.workflow.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import com.group1.oopproject.archive.entity.ArchiveDocument;
import com.group1.oopproject.archive.service.ArchiveService;
import com.group1.oopproject.exception.QuestionnaireNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.QuestionnaireNotFoundException;
import com.group1.oopproject.exception.WorkflowNotFoundException;
import com.group1.oopproject.questionnaire.repository.QuestionnaireRepository;
import com.group1.oopproject.workflow.entity.Workflow;
import com.group1.oopproject.workflow.repository.WorkflowRepository;
import com.group1.oopproject.workflow.entity.ApproverReviewStatus;
import com.group1.oopproject.workflow.entity.AssignedWorkflow;
import com.group1.oopproject.workflow.repository.AssignedWorkflowRepository;
import com.group1.oopproject.questionnaire.entity.Questionnaire;

@Service 
public class WorkflowService {

    @Autowired
    private WorkflowRepository workflowRepository;
    @Autowired
    private AssignedWorkflowRepository assignedWorkflowRepository;
    @Autowired
    private QuestionnaireRepository questionnaireRepository;
    @Autowired
    private ArchiveService archiveService;

    public List<Workflow> findAllWorkflows() {
        try {
            List<Workflow> workflows = workflowRepository.findAll();
            if (workflows.isEmpty()) {
                throw new WorkflowNotFoundException("No workflows found in the database");
            }

            for (Workflow workflow : workflows) {
                List<Questionnaire> questionnaireList = new ArrayList<Questionnaire>();
                if(workflow.getQuestionnaireList()!= null){
                    for (String questionnaireId : workflow.getQuestionnaireList()) {
                        Optional<Questionnaire> optionalQuestionnaire = questionnaireRepository.findById(questionnaireId);
                        if(optionalQuestionnaire.isPresent()){
                            Questionnaire questionnaire = optionalQuestionnaire.get();
                            questionnaireList.add(questionnaire);
                        }else{
                            List<String> newQuestionnaireList = new ArrayList<String>(workflow.getQuestionnaireList());
                            newQuestionnaireList.remove(questionnaireId);
                            workflow.setQuestionnaireList(newQuestionnaireList);
                            workflow.setQuestionnaires(null);
                            workflowRepository.save(workflow);
                        }
                        workflow.setQuestionnaires(questionnaireList);
                }
            }
        }
        return workflows;
        } catch (WorkflowNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findAllWorkflows", e);
        }
    }

    public List<AssignedWorkflow> findAllAssignedWorkflows() {
        try {
            List<AssignedWorkflow> assignedWorkflows = assignedWorkflowRepository.findAll();
            if (assignedWorkflows.isEmpty()) {
                throw new WorkflowNotFoundException("No workflows found in the database");
            }

            for (AssignedWorkflow assignedWorkflow : assignedWorkflows) {
                List<Questionnaire> questionnaireList = new ArrayList<Questionnaire>();
                if(assignedWorkflow.getQuestionnaireList()!= null){
                    for (String questionnaireId : assignedWorkflow.getQuestionnaireList()) {
                        Optional<Questionnaire> optionalQuestionnaire = questionnaireRepository.findById(questionnaireId);
                        if(optionalQuestionnaire.isPresent()){
                            Questionnaire questionnaire = optionalQuestionnaire.get();
                            questionnaireList.add(questionnaire);
                        }else{
                            List<String> newQuestionnaireList = new ArrayList<String>(assignedWorkflow.getQuestionnaireList());
                            newQuestionnaireList.remove(questionnaireId);
                            assignedWorkflow.setQuestionnaireList(newQuestionnaireList);
                            assignedWorkflow.setQuestionnaires(null);
                            assignedWorkflowRepository.save(assignedWorkflow);
                        }
                        assignedWorkflow.setQuestionnaires(questionnaireList);
                    }
                }
            }
            return assignedWorkflows;
        } catch (WorkflowNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findAllAssignedWorkflows" + e.getMessage(), e);
        }
    }

    public List<AssignedWorkflow> findAllAssignedWorkflowsByStatus(ApproverReviewStatus approverReviewStatus) {
        try {
            List<AssignedWorkflow> assignedWorkflows = assignedWorkflowRepository.findByApproverReviewStatus(approverReviewStatus);

            if (assignedWorkflows.isEmpty()) {
                throw new WorkflowNotFoundException("No workflows found in the database");
            }

            for (AssignedWorkflow assignedWorkflow : assignedWorkflows) {
                List<Questionnaire> questionnaireList = new ArrayList<Questionnaire>();
                if(assignedWorkflow.getQuestionnaireList()!= null){
                    for (String questionnaireId : assignedWorkflow.getQuestionnaireList()) {
                        Optional<Questionnaire> optionalQuestionnaire = questionnaireRepository.findById(questionnaireId);
                        if(optionalQuestionnaire.isPresent()){
                            Questionnaire questionnaire = optionalQuestionnaire.get();
                            questionnaireList.add(questionnaire);
                        }else{
                            List<String> newQuestionnaireList = new ArrayList<String>(assignedWorkflow.getQuestionnaireList());
                            newQuestionnaireList.remove(questionnaireId);
                            assignedWorkflow.setQuestionnaireList(newQuestionnaireList);
                            assignedWorkflow.setQuestionnaires(null);
                            assignedWorkflowRepository.save(assignedWorkflow);
                        }
                        assignedWorkflow.setQuestionnaires(questionnaireList);
                    }
                }
            }
            return assignedWorkflows;
        } catch (WorkflowNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findAllAssignedWorkflows" + e.getMessage(), e);
        }
    }

    public Workflow findById(String id) throws WorkflowNotFoundException {
        try {
            Optional<Workflow> optionalWorkflow = workflowRepository.findById(id);
            if(optionalWorkflow == null){
                new WorkflowNotFoundException("Workflow not found with id: " + id);
            }

            Workflow workflow = optionalWorkflow.get();
            List<Questionnaire> questionnaireList = new ArrayList<Questionnaire>();
            for (String questionnaireId : workflow.getQuestionnaireList()) {
                if(questionnaireId != null){
                Optional<Questionnaire> optionalQuestionnaire = questionnaireRepository.findById(questionnaireId);
                if(optionalQuestionnaire.isPresent()){
                    Questionnaire questionnaire = optionalQuestionnaire.get();
                    questionnaireList.add(questionnaire);
                }else{
                    List<String> newQuestionnaireList = new ArrayList<String>(workflow.getQuestionnaireList());
                    newQuestionnaireList.remove(questionnaireId);
                    workflow.setQuestionnaireList(newQuestionnaireList);
                    workflow.setQuestionnaires(null);
                    workflowRepository.save(workflow);
                }
                workflow.setQuestionnaires(questionnaireList);
            }
        }
        return workflow;
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findById", e);
        }
    }

    public AssignedWorkflow findAssignedById(String id) throws WorkflowNotFoundException {
        try {
            Optional<AssignedWorkflow> optionalAssignedWorkflow = assignedWorkflowRepository.findById(id);
            if(optionalAssignedWorkflow == null){
                throw new WorkflowNotFoundException("Workflow not found with id: " + id);
            }
            AssignedWorkflow assignedWorkflow = optionalAssignedWorkflow.get();
            List<Questionnaire> questionnaireList = new ArrayList<Questionnaire>();
            for (String questionnaireId : assignedWorkflow.getQuestionnaireList()) {
                if(questionnaireId != null){
                    Optional<Questionnaire> optionalQuestionnaire = questionnaireRepository.findById(questionnaireId);
                    if(optionalQuestionnaire.isPresent()){
                        Questionnaire questionnaire = optionalQuestionnaire.get();
                        questionnaireList.add(questionnaire);
                    }else{
                        List<String> newQuestionnaireList = new ArrayList<String>(assignedWorkflow.getQuestionnaireList());
                        newQuestionnaireList.remove(questionnaireId);
                        assignedWorkflow.setQuestionnaireList(newQuestionnaireList);
                        assignedWorkflow.setQuestionnaires(null);
                        assignedWorkflowRepository.save(assignedWorkflow);
                    }
                    assignedWorkflow.setQuestionnaires(questionnaireList);
                }
            }

            return assignedWorkflow;
            
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findById", e);
        }
    }

    public List<AssignedWorkflow> findAssignedByVendorId(String id) throws WorkflowNotFoundException {
        try {
            List<AssignedWorkflow> assignedWorkflows = assignedWorkflowRepository.findByAssignedVendorId(id);

            if (assignedWorkflows.isEmpty()) {
                throw new WorkflowNotFoundException("No workflows found in the database");
            }
            for (AssignedWorkflow assignedWorkflow : assignedWorkflows) {
                List<Questionnaire> questionnaireList = new ArrayList<Questionnaire>();
                if(assignedWorkflow.getQuestionnaireList()!= null){
                    for (String questionnaireId : assignedWorkflow.getQuestionnaireList()) {
                        Optional<Questionnaire> optionalQuestionnaire = questionnaireRepository.findById(questionnaireId);
                        if(optionalQuestionnaire.isPresent()){
                            Questionnaire questionnaire = optionalQuestionnaire.get();
                            questionnaireList.add(questionnaire);
                        }else{
                            List<String> newQuestionnaireList = new ArrayList<String>(assignedWorkflow.getQuestionnaireList());
                            newQuestionnaireList.remove(questionnaireId);
                            assignedWorkflow.setQuestionnaireList(newQuestionnaireList);
                            assignedWorkflow.setQuestionnaires(null);
                            assignedWorkflowRepository.save(assignedWorkflow);
                        }
                        assignedWorkflow.setQuestionnaires(questionnaireList);
                    }
                }
            }
            return assignedWorkflows;
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findById", e);
        }
    }

    public List<AssignedWorkflow> findAssignedByAdminId(String id) throws WorkflowNotFoundException {
        try {
            List<AssignedWorkflow> assignedWorkflows = assignedWorkflowRepository.findByAssignedAdminId(id);

            if (assignedWorkflows.isEmpty()) {
                throw new WorkflowNotFoundException("No workflows found in the database");
            }
            for (AssignedWorkflow assignedWorkflow : assignedWorkflows) {
                List<Questionnaire> questionnaireList = new ArrayList<Questionnaire>();
                if(assignedWorkflow.getQuestionnaireList()!= null){
                    for (String questionnaireId : assignedWorkflow.getQuestionnaireList()) {
                        Optional<Questionnaire> optionalQuestionnaire = questionnaireRepository.findById(questionnaireId);
                        if(optionalQuestionnaire.isPresent()){
                            Questionnaire questionnaire = optionalQuestionnaire.get();
                            questionnaireList.add(questionnaire);
                        }else{
                            List<String> newQuestionnaireList = new ArrayList<String>(assignedWorkflow.getQuestionnaireList());
                            newQuestionnaireList.remove(questionnaireId);
                            assignedWorkflow.setQuestionnaireList(newQuestionnaireList);
                            assignedWorkflow.setQuestionnaires(null);
                            assignedWorkflowRepository.save(assignedWorkflow);
                        }
                        assignedWorkflow.setQuestionnaires(questionnaireList);
                    }
                }
            }
            return assignedWorkflows;
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findById", e);
        }
    }

    public Workflow createWorkflow(Workflow workflow) throws DatabaseCommunicationException {
        try {
            workflow.setCreatedAt(LocalDateTime.now());
            return workflowRepository.save(workflow);
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with the database for method createWorkflow",
                    e); 
        }
    }

    public AssignedWorkflow createAssignedWorkflow(AssignedWorkflow assignedWorkflow) throws DatabaseCommunicationException {
        try {
            assignedWorkflow.setCreatedAt(LocalDateTime.now());
            return assignedWorkflowRepository.save(assignedWorkflow);
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with the database for method createWorkflow", e); 
        }
    }

    public Workflow updateWorkflow(Workflow workflow) throws DatabaseCommunicationException {
        try {
            if (workflowRepository.findById(workflow.getId()).isPresent()){
                // UPDATE
                return workflowRepository.save(workflow);
            } else {
                throw new WorkflowNotFoundException("No workflow found in the database with id: " + workflow.getId());
            }
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method updateById: " + e.getMessage(), e);
        }
    }   

    public AssignedWorkflow updateAssignedWorkflow(AssignedWorkflow assignedWorkflow) throws DatabaseCommunicationException {
        try {
            if (assignedWorkflowRepository.findById(assignedWorkflow.getId()).isPresent()){
                // UPDATE

                if(assignedWorkflow.getApproverReviewStatus().equals("FLAGGED") && !assignedWorkflowRepository.findById(assignedWorkflow.getId()).get().getApproverReviewStatus().equals("FLAGGED") ){
                    assignedWorkflow.setApprovalRequestDate(LocalDateTime.now());
                }
                return assignedWorkflowRepository.save(assignedWorkflow);
            } else {
                throw new WorkflowNotFoundException("No workflow found in the database with id: " + assignedWorkflow.getId());
            }
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method updateById: " + e.getMessage(), e);
        }
    }  
    
    public void deleteById(String id, String userId) throws DatabaseCommunicationException {
        try{
            Workflow workflow = workflowRepository.findById(id)
            .orElseThrow(() -> new WorkflowNotFoundException("No workflow found in the database with id: " + id));
            
            workflowRepository.deleteById(workflow.getId());

            archiveService.createArchiveDocument(ArchiveDocument.builder().id(workflow.getId()).collection("workflow").deletedBy(userId).data(workflow).build());

        } catch (WorkflowNotFoundException e) {
            throw e;
        }catch(Exception e){
            throw new DatabaseCommunicationException("Error communicating with the database for method createWorkflow",
            e); 
        }
    }

    public void deleteAssignedById(String id, String userId) throws DatabaseCommunicationException {
        try{
            AssignedWorkflow assignedWorkflow = assignedWorkflowRepository.findById(id)
            .orElseThrow(() -> new WorkflowNotFoundException("No workflow found in the database with id: " + id));
            
            assignedWorkflowRepository.deleteById(assignedWorkflow.getId());

            archiveService.createArchiveDocument(ArchiveDocument.builder().id(assignedWorkflow.getId()).collection("assignedWorkflow").deletedBy(userId).data(assignedWorkflow).build());

        } catch (WorkflowNotFoundException e) {
            throw e;
        }catch(Exception e){
            throw new DatabaseCommunicationException("Error communicating with the database for method createWorkflow",
            e); 
        }
    }

    public boolean checkQuestionnaireInWorkflows(String qnId) {
        try {
            List<Workflow> workflows = workflowRepository.findAll();
            if (workflows.isEmpty()) {
                throw new WorkflowNotFoundException("No workflows found in the database");
            }

            for (Workflow workflow : workflows) {
                for (String questionnaireId : workflow.getQuestionnaireList()) {
                    if (questionnaireId.equals(qnId)){
                        throw new QuestionnaireNotFoundException("Questionnaire exists in workflow!");
                    }
                }
            }
            return false;
        } catch (WorkflowNotFoundException | QuestionnaireNotFoundException e) {
            return true;
//            throw e;
        } catch (Exception e) {
            return true;
//            throw new DatabaseCommunicationException("Error communicating with database for method findAllWorkflows", e);
        }
    }



}