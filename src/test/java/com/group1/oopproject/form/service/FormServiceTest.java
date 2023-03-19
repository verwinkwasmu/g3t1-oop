package com.group1.oopproject.form.service;

import com.group1.oopproject.form.entity.FormStatus;
import com.group1.oopproject.form.repository.FormRepository;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.FormNotFoundException;
import com.group1.oopproject.form.entity.Form;

@ExtendWith(MockitoExtension.class)
public class FormServiceTest {

    @InjectMocks
    private FormService formService;

    @Mock
    private FormRepository formRepository;

    @Test
    public void testFindAllFormsSuccess() {

        // given
        List<Form> forms = new ArrayList<>();
        forms.add(new Form());
        forms.add(new Form());

        when(formRepository.findAll()).thenReturn(forms);

        // when
        List<Form> result = formService.findAllForms();

        // then
        assertEquals(result, forms);
    }

    @Test
    public void testFindAllFormsNoFormsFound() {

        // given
        when(formRepository.findAll()).thenReturn(Collections.emptyList());

        // when
        try {
            //when
            formService.findAllForms();
            fail("Expected FormNotFoundException to be thrown");
        } catch (FormNotFoundException e) {
            assertEquals("No forms found in the database", e.getMessage());

        }
       
    }

    @Test
    public void testFindAllFormsDatabaseError() {

        //given
        when(formRepository.findAll()).thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> formService.findAllForms());
    }

    @Test
    public void testFindByIdSuccess() {
        // given
        Form form = new Form();
        when(formRepository.findById(form.getId())).thenReturn(Optional.of(form));

        // when
        Form result = formService.findById(form.getId());

        // then
        assertEquals(result, form);
    }

    @Test
    public void testFindByIdFormNotFound() {
        // given
        String id = "some-id";
        when(formRepository.findById(id)).thenReturn(Optional.empty());

        // when
        try {
            formService.findById(id);
            fail("Expected FormNotFoundException to be thrown");
        } catch (FormNotFoundException e) {
            assertEquals("Form not found with id: " + id, e.getMessage());
        }
    }

    @Test
    public void testFindByIdDatabaseError() {
        // given
        String id = "some-id";
        when(formRepository.findById(id))
                .thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> formService.findById(id));

    }

    @Test
    public void testCreateFormSuccess() {
        // given
        Form form = new Form();
        when(formRepository.save(form)).thenReturn(form);

        // when
        Form result = formService.createForm(form);

        // then
        assertEquals(result, form);
        assertNotNull(result.getCreatedAt());
    }

    @Test
    public void testCreateFormDatabaseError() {
        // given
        Form form = new Form();
        when(formRepository.save(form))
                .thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> formService.createForm(form));
    }

    @Test
    public void testFindByAssignedToSuccess() {

        // given
        List<Form> forms = new ArrayList<>();
        forms.add(new Form("1", "John doe", "joedoe-uuid", "admin-uuid", "test", "hi",
                FormStatus.APPROVED, null,
                null, null, null));

        when(formRepository.findByAssignedTo("test-id")).thenReturn(forms);

        // when
        List<Form> result = formService.findByAssignedTo("test-id");

        // then
        assertEquals(result, forms);
    }

    @Test
    public void testFindByAssignedToNoFormsFound() {

        // given
        when(formRepository.findByAssignedTo("test-id")).thenReturn(Collections.emptyList());

        // when
        try {
            //when
            formService.findByAssignedTo("test-id");
            fail("Expected FormNotFoundException to be thrown");
        } catch (FormNotFoundException e) {
            assertEquals("No forms found in the database for user with id: test-id" , e.getMessage());

        }
       
    }

    @Test
    public void testFindByAssignedToDatabaseError() {

        //given
        when(formRepository.findByAssignedTo("test-id")).thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> formService.findByAssignedTo("test-id"));
    }

    @Test
    public void testDeleteByIdSuccess() {
        // given
        Form form = new Form();
        when(formRepository.findById(form.getId())).thenReturn(Optional.of(form));

        // when
        formService.deleteById(form.getId());

        // then
        verify(formRepository).findById(form.getId());
        verify(formRepository).deleteById(form.getId());
    }

    @Test
    public void testDeleteById_givenNonExistingFormId_shouldThrowFormNotFoundException() {
        // given
        when(formRepository.findById("test-id")).thenReturn(java.util.Optional.empty());

        // when
        try {
            //when
            formService.deleteById("test-id");
            fail("Expected FormNotFoundException to be thrown");
        } catch (FormNotFoundException e) {
            assertEquals("No forms found in the database for user with id: test-id" , e.getMessage());

        }
    }

    @Test
    public void testDeleteByIdDatabaseError() {

        //given
        when(formRepository.findById("test-id")).thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> formService.deleteById("test-id"));
    }

    @Test
    public void testUpdateFormSuccess() {
        // Arrange
        Form existingForm = new Form();
        existingForm.setId("test-id");
        existingForm.setFormStatus(FormStatus.SUBMITTED);
        when(formRepository.findById(existingForm.getId())).thenReturn(Optional.of(existingForm));

        Form updatedForm = new Form();
        updatedForm.setId("test-id");
        updatedForm.setFormStatus(FormStatus.APPROVED);
        when(formRepository.save(updatedForm)).thenReturn(updatedForm);

        // Act
        Form result = formService.updateForm(updatedForm);

        // Assert
        verify(formRepository).findById(existingForm.getId());
        verify(formRepository).save(updatedForm);
        assertNotNull(result);
        assertEquals(result.getId(), existingForm.getId());
        assertEquals(result.getFormStatus(), updatedForm.getFormStatus());
    }

    @Test
    public void testUpdateForm_FormNotFoundException() {
        // Arrange
        Form nonExistingForm = new Form();
        nonExistingForm.setId("test-id");
        when(formRepository.findById(nonExistingForm.getId())).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(FormNotFoundException.class, () -> {
            formService.updateForm(nonExistingForm);
        });
    }

    @Test
    public void testUpdateForm_DatabaseCommunicationException() {
        // Arrange
        Form existingForm = new Form();
        existingForm.setId("test-id");
        existingForm.setFormStatus(FormStatus.SUBMITTED);
        when(formRepository.findById(existingForm.getId())).thenReturn(Optional.of(existingForm));

        Form updatedForm = new Form();
        updatedForm.setId("test-id");
        updatedForm.setFormStatus(FormStatus.APPROVED);

        when(formRepository.save(updatedForm)).thenThrow(UncategorizedMongoDbException.class);

        // Act and Assert
        assertThrows(DatabaseCommunicationException.class, () -> {
            formService.updateForm(updatedForm);
        });
    }

    @Test
    public void testGetSubmittedFormsSuccess() {

        // given
        List<Form> forms = new ArrayList<>();
        forms.add(new Form("1", "John doe", "joedoe-uuid", "admin-uuid", "test", "hi",
                FormStatus.SUBMITTED, null, null,
                null, null));

        when(formRepository.findByFormStatus(FormStatus.SUBMITTED)).thenReturn(forms);

        // when
        List<Form> result = formService.getFormsByFormStatus(FormStatus.SUBMITTED);

        // then
        assertEquals(result, forms);
    }

    @Test
    public void testGetSubmittedFormsNoFormsFound() {

        // given
        when(formRepository.findByFormStatus(FormStatus.SUBMITTED)).thenReturn(Collections.emptyList());

        // when
        try {
            //when
            formService.getFormsByFormStatus(FormStatus.SUBMITTED);
            fail("Expected FormNotFoundException to be thrown");
        } catch (FormNotFoundException e) {
            assertEquals("No forms found in the database for approvalStatus of: " + FormStatus.SUBMITTED , e.getMessage());

        }

    }

    @Test
    public void testGetSubmittedFormsDatabaseError() {

        //given
        when(formRepository.findByFormStatus(FormStatus.SUBMITTED)).thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> formService.getFormsByFormStatus(FormStatus.SUBMITTED));
    }
}
