package com.group1.oopproject.workflow.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.group1.oopproject.workflow.entity.Workflow;
import com.group1.oopproject.workflow.service.WorkflowService;
import com.group1.oopproject.exception.WorkflowNotFoundException;
import com.group1.oopproject.exception.DatabaseCommunicationException;

@ExtendWith(MockitoExtension.class)
public class WorkflowControllerTest {

    @InjectMocks
    private WorkflowController workflowController;

    @Mock
    private WorkflowService workflowService;

    @Test
    public void testFindAllWorkflows_Success() {
        List<Workflow> workflows = List.of(new Workflow(), new Workflow());
        when(workflowService.findAllWorkflows()).thenReturn(workflows);
        ResponseEntity<List<Workflow>> response = workflowController.findAllWorkflows();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(workflows, response.getBody());
    }

    @Test
    public void testFindAllWorkflows_WorkflowNotFound() {
        when(workflowService.findAllWorkflows()).thenThrow(WorkflowNotFoundException.class);
        ResponseEntity<List<Workflow>> response = workflowController.findAllWorkflows();
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testFindAllWorkflows_DatabaseCommunicationException() {
        when(workflowService.findAllWorkflows()).thenThrow(DatabaseCommunicationException.class);
        ResponseEntity<List<Workflow>> response = workflowController.findAllWorkflows();
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    public void testFindById_whenWorkflowFound_shouldReturn200OK() {

        // Arrange
        Workflow expectedWorkflow = new Workflow();
        expectedWorkflow.setId("1");
        expectedWorkflow.setWorkflowName("Test Workflow");
        when(workflowService.findById("1")).thenReturn(expectedWorkflow);

        // Act
        ResponseEntity<Workflow> response = workflowController.findById("1");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedWorkflow, response.getBody());

    }

    @Test
    public void testFindById_whenWorkflowNotFound_shouldReturn404NotFound() {
        // Arrange
        when(workflowService.findById("1")).thenThrow(new WorkflowNotFoundException("Workflow not found"));

        // Act
        ResponseEntity<Workflow> response = workflowController.findById("1");

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testFindById_whenDatabaseCommunicationError_shouldReturn500InternalServerError() {
        // Arrange
        when(workflowService.findById("1")).thenThrow(new DatabaseCommunicationException("Error communicating with database", null));

        // Act
        ResponseEntity<Workflow> response = workflowController.findById("1");

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testCreateWorkflowSuccess() {
        Workflow workflow = new Workflow();
        when(workflowService.createWorkflow(workflow)).thenReturn(workflow);

        ResponseEntity<Workflow> response = workflowController.createWorkflow(workflow);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(workflow, response.getBody());
    }

    @Test
    public void testCreateWorkflowDatabaseCommunicationException() {
        Workflow workflow = new Workflow();
        when(workflowService.createWorkflow(workflow))
                .thenThrow(new DatabaseCommunicationException("Error communicating with database", null));

        ResponseEntity<Workflow> response = workflowController.createWorkflow(workflow);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

}