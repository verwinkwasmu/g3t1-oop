package com.group1.oopproject.workflow.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.WorkflowNotFoundException;
import com.group1.oopproject.workflow.entity.Workflow;
import com.group1.oopproject.workflow.repository.WorkflowRepository;

@Service
public class WorkflowService {

    @Autowired
    private WorkflowRepository workflowRepository;

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

    public Workflow findById(String id) throws WorkflowNotFoundException {
        try {
            Optional<Workflow> workflow = workflowRepository.findById(id);
            return workflow.orElseThrow(() -> new WorkflowNotFoundException("Workflow not found with id: " + id));
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

    public Workflow updateWorkflow(Workflow workflow) throws DatabaseCommunicationException {
        try{
            Workflow workflowToUpdate = workflowRepository.findById(workflow.getId()).get();
            workflowToUpdate.setWorkflowName(workflow.getWorkflowName());
            workflowToUpdate.setAttachedUserId(workflow.getAttachedUserId());
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

}
