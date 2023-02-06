package com.group1.oopproject.form.repository;

import java.util.Optional;
import java.util.Arrays;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import com.group1.oopproject.form.entity.ApprovalStatus;
import com.group1.oopproject.form.entity.Form;
import com.group1.oopproject.form.entity.Status;

@ExtendWith(MockitoExtension.class)
@DataMongoTest
public class FormRepositoryTest {

    @Mock
    private FormRepository formRepository;

    private Form form;

    @BeforeEach
    void setUp() {
        form = new Form("1", "John doe", "joedoe-uuid", "admin-uuid", "test", Status.COMPLETED, ApprovalStatus.APPROVED,
                null, null);
    }

    @AfterEach
    void tearDown() {
        formRepository.delete(form);
    }

    @Test
    void findById_whenFormExists_returnsForm() {
        when(formRepository.findById(anyString())).thenReturn(Optional.of(form));
        Optional<Form> result = formRepository.findById("1");
        assertThat(result).isPresent().get().isEqualTo(form);

    }

    @Test
    void findById_whenFormDoesNotExist_returnsEmpty() {
        when(formRepository.findById("2")).thenReturn(Optional.empty());
        Optional<Form> result = formRepository.findById("2");
        assertThat(result).isEmpty();
    }

    @Test
    void findByAssignedTo_whenFormExists_returnsForm() {
        when(formRepository.findByAssignedTo("joedoe-uuid")).thenReturn(Arrays.asList(form));
        List<Form> result = formRepository.findByAssignedTo("joedoe-uuid");
        assertThat(result).hasSize(1);
        assertThat(result).extracting(Form::getAssignedTo).containsOnly("joedoe-uuid");

    }

    @Test
    void findByAssignedTo_whenFormDoesNotExists_returnsEmpty() {
        when(formRepository.findByAssignedTo("joedoe-uuid")).thenReturn(Arrays.asList());
        List<Form> result = formRepository.findByAssignedTo("joedoe-uuid");
        assertThat(result).isEmpty();
    }

}
