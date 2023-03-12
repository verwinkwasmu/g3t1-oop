package com.group1.oopproject.form.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;

import java.util.List;
import java.util.Arrays;

import com.group1.oopproject.form.entity.WorkflowStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.group1.oopproject.form.entity.Form;
import com.group1.oopproject.form.service.FormService;
import com.group1.oopproject.exception.FormNotFoundException;
import com.group1.oopproject.exception.DatabaseCommunicationException;

@ExtendWith(MockitoExtension.class)
public class FormControllerTest {

    @InjectMocks
    private FormController formController;

    @Mock
    private FormService formService;

    @Test
    public void testFindAllForms_Success() {
        List<Form> forms = List.of(new Form(), new Form());
        when(formService.findAllForms()).thenReturn(forms);
        ResponseEntity<List<Form>> response = formController.findAllForms();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(forms, response.getBody());
    }

    @Test
    public void testFindAllForms_FormNotFound() {
        when(formService.findAllForms()).thenThrow(FormNotFoundException.class);
        ResponseEntity<List<Form>> response = formController.findAllForms();
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testFindAllForms_DatabaseCommunicationException() {
        when(formService.findAllForms()).thenThrow(DatabaseCommunicationException.class);
        ResponseEntity<List<Form>> response = formController.findAllForms();
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    public void testFindById_whenFormFound_shouldReturn200OK() {

        // Arrange
        Form expectedForm = new Form();
        expectedForm.setId("1");
        expectedForm.setName("Test Form");
        when(formService.findById("1")).thenReturn(expectedForm);

        // Act
        ResponseEntity<Form> response = formController.findById("1");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedForm, response.getBody());

    }

    @Test
    public void testFindById_whenFormNotFound_shouldReturn404NotFound() {
        // Arrange
        when(formService.findById("1")).thenThrow(new FormNotFoundException("Form not found"));

        // Act
        ResponseEntity<Form> response = formController.findById("1");

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testFindById_whenDatabaseCommunicationError_shouldReturn500InternalServerError() {
        // Arrange
        when(formService.findById("1")).thenThrow(new DatabaseCommunicationException("Error communicating with database", null));

        // Act
        ResponseEntity<Form> response = formController.findById("1");

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testCreateFormSuccess() {
        Form form = new Form();
        when(formService.createForm(form)).thenReturn(form);

        ResponseEntity<Form> response = formController.createForm(form);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(form, response.getBody());
    }

    @Test
    public void testCreateFormDatabaseCommunicationException() {
        Form form = new Form();
        when(formService.createForm(form))
                .thenThrow(new DatabaseCommunicationException("Error communicating with database", null));

        ResponseEntity<Form> response = formController.createForm(form);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testFindByAssignedTo() {
        // Given
        String userId = "user123";

        Form form1 = new Form();
        List<Form> expectedForms = Arrays.asList(form1);

        // When
        when(formService.findByAssignedTo(userId)).thenReturn(expectedForms);
        ResponseEntity<List<Form>> actualResponse = formController.findByAssignedTo(userId);

        // Then
        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(expectedForms, actualResponse.getBody());
    }

    @Test
    public void testFindByAssignedTo_FormNotFoundException() {
        // Given
        String userId = "user123";

        // When
        when(formService.findByAssignedTo(userId)).thenThrow(FormNotFoundException.class);
        ResponseEntity<List<Form>> actualResponse = formController.findByAssignedTo(userId);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

    @Test
    public void testFindByAssignedTo_DatabaseCommunicationException() {
        // Given
        String userId = "user123";

        // When
        when(formService.findByAssignedTo(userId)).thenThrow(DatabaseCommunicationException.class);
        ResponseEntity<List<Form>> actualResponse = formController.findByAssignedTo(userId);

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

    @Test
    public void testDeleteById_Success() {
        String id = "test-id";

        doNothing().when(formService).deleteById(id);
        ResponseEntity<Void> actualResponse = formController.deleteById(id);

        verify(formService).deleteById(id);
        assertEquals(HttpStatus.NO_CONTENT, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

    @Test
    public void testDeleteByIdForm_NotFoundException() throws Exception {
        String id = "test-id";

        doThrow(FormNotFoundException.class).when(formService).deleteById(id);
        ResponseEntity<Void> actualResponse = formController.deleteById(id);

        verify(formService).deleteById(id);
        assertEquals(HttpStatus.NOT_FOUND, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

    @Test
    public void testDeleteById_DatabaseCommunicationException() throws Exception {
        String id = "test-id";

        doThrow(DatabaseCommunicationException.class).when(formService).deleteById(id);
        ResponseEntity<Void> actualResponse = formController.deleteById(id);

        verify(formService).deleteById(id);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

    @Test
    public void testUpdateForm_Success(){
        // Arrange
        Form form = new Form();
        form.setId("test-id");

        // Act
        when(formService.updateForm(form)).thenReturn(form);
        ResponseEntity<Form> actualResponse = formController.updateForm(form);

        // Assert
        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(form, actualResponse.getBody());
    }


    @Test
    public void testUpdateForm_FormNotFoundException(){
        // Arrange
        Form form = new Form();
        form.setId("test-id");

        // Act
        when(formService.updateForm(form)).thenThrow(FormNotFoundException.class);
        ResponseEntity<Form> actualResponse = formController.updateForm(form);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

    @Test
    public void testUpdateForm_DatabaseCommunicationException(){
        // Arrange
        Form form = new Form();
        form.setId("test-id");

        // Act
        when(formService.updateForm(form)).thenThrow(DatabaseCommunicationException.class);
        ResponseEntity<Form> actualResponse = formController.updateForm(form);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

    @Test
    public void testGetFormsByWorkflowStatus_Success() {

        Form form1 = new Form();
        List<Form> expectedForms = Arrays.asList(form1);

        // When
        when(formService.getFormsByWorkflowStatus(WorkflowStatus.SUBMITTED)).thenReturn(expectedForms);
        ResponseEntity<List<Form>> actualResponse = formController.getSubmittedForms("SUBMITTED");

        // Then
        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(expectedForms, actualResponse.getBody());
    }

    @Test
    public void testGetFormsByWorkflowStatus_FormNotFoundException() {

        // When
        when(formService.getFormsByWorkflowStatus(WorkflowStatus.SUBMITTED)).thenThrow(FormNotFoundException.class);
        ResponseEntity<List<Form>> actualResponse = formController.getSubmittedForms("SUBMITTED");

        // Then
        assertEquals(HttpStatus.NOT_FOUND, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

    @Test
    public void testGetFormsByWorkflowStatus_DatabaseCommunicationException() {

        // When
        when(formService.getFormsByWorkflowStatus(WorkflowStatus.SUBMITTED)).thenThrow(DatabaseCommunicationException.class);
        ResponseEntity<List<Form>> actualResponse = formController.getSubmittedForms("SUBMITTED");

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, actualResponse.getStatusCode());
        assertNull(actualResponse.getBody());
    }

}