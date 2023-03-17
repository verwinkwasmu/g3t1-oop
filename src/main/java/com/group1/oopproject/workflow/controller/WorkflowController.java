package com.group1.oopproject.workflow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.WorkflowNotFoundException;
import com.group1.oopproject.workflow.entity.Workflow;
import com.group1.oopproject.workflow.entity.AssignedWorkflow;
import com.group1.oopproject.workflow.service.WorkflowService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/v1/workflow")
public class WorkflowController {

    @Autowired
    private WorkflowService workflowService;

    private Logger logger = LoggerFactory.getLogger(getClass());

    @GetMapping
    public ResponseEntity<List<Workflow>> findAllWorkflows() {
        try {
            return ResponseEntity.ok(workflowService.findAllWorkflows());
        } catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/assigned")
    public ResponseEntity<List<AssignedWorkflow>> findAllAssignedWorkflows() {
        try {
            return ResponseEntity.ok(workflowService.findAllAssignedWorkflows());
        } catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workflow> findById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(workflowService.findById(id));
        } catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/assigned/{id}")
    public ResponseEntity<AssignedWorkflow> findAssignedById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(workflowService.findAssignedById(id));
        } catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/assigned/admin/{id}")
    public ResponseEntity <List<AssignedWorkflow>> findAssignedByAdminId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(workflowService.findAssignedByAdminId(id));
        } catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/assigned/vendor/{id}")
    public ResponseEntity <List<AssignedWorkflow>> findAssignedByVendorId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(workflowService.findAssignedByVendorId(id));
        } catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //assign questionnaires to workflows on create 
    @PostMapping
    public ResponseEntity<Workflow> createWorkflow(@RequestBody Workflow workflow) {

        try {
            return ResponseEntity.ok(workflowService.createWorkflow(workflow));
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/assigned")
    public ResponseEntity<AssignedWorkflow> createAssignedWorkflow(@RequestBody AssignedWorkflow assignedWorkflow) {

        try {
            return ResponseEntity.ok(workflowService.createAssignedWorkflow(assignedWorkflow));
        } catch (DatabaseCommunicationException e) {
            logger.error("Error communicating with database: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //assign questionnaires to workflows on update 
    @PutMapping
    public ResponseEntity<Workflow> updateWorkflow(@RequestBody Workflow workflow){
        try{
            return ResponseEntity.ok(workflowService.updateWorkflow(workflow));
        }catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch(DatabaseCommunicationException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/assigned")
    public ResponseEntity<AssignedWorkflow> updateAssignedWorkflow(@RequestBody AssignedWorkflow assignedWorkflow){
        try{
            return ResponseEntity.ok(workflowService.updateAssignedWorkflow(assignedWorkflow));
        }catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch(DatabaseCommunicationException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Workflow> deleteWorkflow(@PathVariable String id){
        try{
            return ResponseEntity.ok(workflowService.deleteWorkflow(id));
        }catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch(DatabaseCommunicationException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/assigned/{id}")
    public ResponseEntity<Workflow> deleteAssignedWorkflow(@PathVariable String id){
        try{
            return ResponseEntity.ok(workflowService.deleteAssignedWorkflow(id));
        }catch (WorkflowNotFoundException e) {
            logger.error("WorkflowNotFoundException: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch(DatabaseCommunicationException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
