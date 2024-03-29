// package com.group1.oopproject.workflow.repository;

// import static org.assertj.core.api.Assertions.assertThat;
// import static org.mockito.ArgumentMatchers.anyString;
// import static org.mockito.Mockito.when;

// import java.util.Optional;

// import org.junit.jupiter.api.AfterEach;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

// import com.group1.oopproject.form.entity.WorkflowStatus;
// import com.group1.oopproject.workflow.entity.AssignedWorkflow;

// import com.group1.oopproject.workflow.entity.Workflow;


// @ExtendWith(MockitoExtension.class)
// @DataMongoTest
// public class AssignedWorkflowRepositoryTest {

//     @Mock
//     private AssignedWorkflowRepository assignedWorkflowRepository;

//     private AssignedWorkflow assignedWorkflow;

//     private Workflow workflow;

//     @BeforeEach
//     void setUp() {
//         // workflow = new Workflow("workflowIdTest", "workflowNameTest", new String[]{"workflowListTestStep1", "workflowListTestStep1"}, null);
//         assignedWorkflow = new AssignedWorkflow("workflowIdTest", "workflowNameTest", new String[]{"workflowListTestStep1", "workflowListTestStep1"}, null, "FormIdTest", "VendorIdTest", "AdminIdTest", WorkflowStatus.INITIAL_DRAFT);
    
//     }

//     @AfterEach
//     void tearDown() {
//         workflowRepository.delete(workflow);
//     }

//     @Test
//     void findWorkflowById_whenWorkflowExists_returnsWorkflow() {
//         Optional<Workflow> result = workflowRepository.findById("workflowIdTest");
//         assertThat(result).isPresent().get().isEqualTo(workflow);
//     }

//     @Test
//     void findWorkflowById_whenWorkflowDoesNotExist_returnsEmpty() {
//         when(workflowRepository.findById("2")).thenReturn(Optional.empty());
//         Optional<Workflow> result = workflowRepository.findById("2");
//         assertThat(result).isEmpty();
//     }
// }
