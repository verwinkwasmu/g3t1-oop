package com.group1.oopproject.workflow.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.WorkflowNotFoundException;
import com.group1.oopproject.questionnaire.repository.QuestionnaireRepository;
import com.group1.oopproject.workflow.entity.Workflow;
import com.group1.oopproject.workflow.repository.WorkflowRepository;
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

    public List<Workflow> findAllWorkflows() {
        try {
            List<Workflow> workflows = workflowRepository.findAll();
            if (workflows.isEmpty()) {
                throw new WorkflowNotFoundException("No workflows found in the database");
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
            return assignedWorkflows;
        } catch (WorkflowNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findAllWorkflows", e);
        }
    }

    public Workflow findById(String id) throws WorkflowNotFoundException {
        try {
            Optional<Workflow> workflow = workflowRepository.findById(id);
            return workflow.orElseThrow(() -> new WorkflowNotFoundException("Workflow not found with id: " + id));
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
                Optional<Questionnaire> optionalQuestionnaire = questionnaireRepository.findById(questionnaireId);
                Questionnaire questionnaire = optionalQuestionnaire.get();
                questionnaireList.add(questionnaire);
                assignedWorkflow.setQuestionnaires(questionnaireList);
            }

            return assignedWorkflow;
            
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findById", e);
        }
    }

    public List<AssignedWorkflow> findAssignedByVendorId(String id) throws WorkflowNotFoundException {
        try {
            List<AssignedWorkflow> assignedWorkflows = assignedWorkflowRepository.findAll();
            if (assignedWorkflows.isEmpty()) {
                throw new WorkflowNotFoundException("No workflows found in the database");
            }
            List<AssignedWorkflow> returned = new ArrayList<AssignedWorkflow>();

            for (AssignedWorkflow assignedWorkflow : assignedWorkflows){
                if(assignedWorkflow.getAssignedVendorId().equals(id)){
                    returned.add(assignedWorkflow);
                }
            }
            if (returned.isEmpty()){
                throw new WorkflowNotFoundException("No workflows found under Vendor Id " + id);
            }
            return returned;
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
        try{
            Workflow workflowToUpdate = workflowRepository.findById(workflow.getId()).get();
            workflowToUpdate.setWorkflowName(workflow.getWorkflowName());
            workflowToUpdate.setQuestionnaires(workflow.getQuestionnaires());
            return workflowRepository.save(workflowToUpdate);
        } catch (WorkflowNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findAllWorkflows", e);
        }
    }   

    public AssignedWorkflow updateAssignedWorkflow(AssignedWorkflow assignedWorkflow) throws DatabaseCommunicationException {
        try{
            AssignedWorkflow workflowToUpdate = assignedWorkflowRepository.findById(assignedWorkflow.getId()).get();
            workflowToUpdate.setWorkflowName(assignedWorkflow.getWorkflowName());
            workflowToUpdate.setQuestionnaireList(assignedWorkflow.getQuestionnaireList());
            workflowToUpdate.setAssignedVendorId(assignedWorkflow.getAssignedVendorId());
            workflowToUpdate.setApproverReviewStatus(assignedWorkflow.getApproverReviewStatus());
            workflowToUpdate.setApprovalRequestDate(assignedWorkflow.getApprovalRequestDate());

            if (assignedWorkflow.getApproverReviewStatus().equals("APPROVED")){
                workflowToUpdate.setApprovedAt(LocalDateTime.now());
            }
            
            return workflowRepository.save(workflowToUpdate);
        } catch (WorkflowNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method findAllWorkflows", e);
        }
    }  
    
    public Workflow deleteWorkflow(String workflowId) throws DatabaseCommunicationException {
        try{
            Optional<Workflow> deletedWorkflow = workflowRepository.findById(workflowId);
            workflowRepository.deleteById(workflowId);
            return deletedWorkflow.orElseThrow(() -> new WorkflowNotFoundException("Workflow deleted"));
        } catch (WorkflowNotFoundException e) {
            throw e;
        }catch(Exception e){
            throw new DatabaseCommunicationException("Error communicating with the database for method createWorkflow",
            e); 
        }
    }

    public AssignedWorkflow deleteAssignedWorkflow(String workflowId) throws DatabaseCommunicationException {
        try{
            Optional<AssignedWorkflow> deletedWorkflow = assignedWorkflowRepository.findById(workflowId);
            assignedWorkflowRepository.deleteById(workflowId);
            return deletedWorkflow.orElseThrow(() -> new WorkflowNotFoundException("Workflow deleted"));
        } catch (WorkflowNotFoundException e) {
            throw e;
        }catch(Exception e){
            throw new DatabaseCommunicationException("Error communicating with the database for method createWorkflow",
            e); 
        }
    }

}
