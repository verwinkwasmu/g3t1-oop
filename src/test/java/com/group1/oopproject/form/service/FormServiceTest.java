package com.group1.oopproject.form.service;

import com.group1.oopproject.form.repository.FormRepository;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;
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
import com.group1.oopproject.form.entity.WorkflowStatus;

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
        forms.add(new Form("1", "John doe", "joedoe-uuid", "admin-uuid", "test",
                WorkflowStatus.APPROVED,
                null, null));

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
}
