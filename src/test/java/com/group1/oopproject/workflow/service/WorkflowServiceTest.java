// package com.group1.oopproject.workflow.service;

// import com.group1.oopproject.workflow.repository.WorkflowRepository;
// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.assertThrows;
// import static org.junit.jupiter.api.Assertions.fail;
// import static org.mockito.Mockito.when;
// import java.util.ArrayList;
// import java.util.Collections;
// import java.util.List;
// import java.util.Optional;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.data.mongodb.UncategorizedMongoDbException;
// import com.group1.oopproject.exception.DatabaseCommunicationException;
// import com.group1.oopproject.exception.WorkflowNotFoundException;
// import com.group1.oopproject.workflow.entity.Workflow;

// @ExtendWith(MockitoExtension.class)
// public class WorkflowServiceTest {

//     @InjectMocks
//     private WorkflowService workflowService;

//     @Mock
//     private WorkflowRepository workflowRepository;

//     @Test
//     public void testFindAllWorkflowsSuccess() {

//         // given
//         List<Workflow> workflows = new ArrayList<>();
//         workflows.add(new Workflow());
//         workflows.add(new Workflow());

//         when(workflowRepository.findAll()).thenReturn(workflows);

//         // when
//         List<Workflow> result = workflowService.findAllWorkflows();

//         // then
//         assertEquals(result, workflows);
//     }


//     @Test
//     public void testFindAllWorkflowsNoWorkflowsFound() {

//         // given
//         when(workflowRepository.findAll()).thenReturn(Collections.emptyList());

//         // when
//         try {
//             //when
//             workflowService.findAllWorkflows();
//             fail("Expected FormNotFoundException to be thrown");
//         } catch (WorkflowNotFoundException e) {
//             assertEquals("No workflows found in the database", e.getMessage());

//         }
       
//     }

//     @Test
//     public void testFindAllWorkflowsDatabaseError() {

//         //given
//         when(workflowRepository.findAll()).thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

//         // when
//         assertThrows(DatabaseCommunicationException.class, () -> workflowService.findAllWorkflows());
//     }

//     @Test
//     public void testFindByIdSuccess() {
//         // given
//         Workflow workflow = new Workflow();
//         when(workflowRepository.findById(workflow.getId())).thenReturn(Optional.of(workflow));

//         // when
//         Workflow result = workflowService.findById(workflow.getId());

//         // then
//         assertEquals(result, workflow);
//     }

//     @Test
//     public void testFindByIdWorkflowNotFound() {
//         // given
//         String id = "some-id";
//         when(workflowRepository.findById(id)).thenReturn(Optional.empty());

//         // when
//         try {
//             workflowService.findById(id);
//             fail("Expected FormNotFoundException to be thrown");
//         } catch (WorkflowNotFoundException e) {
//             assertEquals("Workflow not found with id: " + id, e.getMessage());
//         }
//     }

//     @Test
//     public void testFindByIdDatabaseError() {
//         // given
//         String id = "some-id";
//         when(workflowRepository.findById(id))
//                 .thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

//         // when
//         assertThrows(DatabaseCommunicationException.class, () -> workflowService.findById(id));

//     }

//     @Test
//     public void testCreateWorkflowSuccess() {
//         // given
//         Workflow workflow = new Workflow();
//         when(workflowRepository.save(workflow)).thenReturn(workflow);

//         // when
//         Workflow result = workflowService.createWorkflow(workflow);

//         // then
//         assertEquals(result, workflow);
//         assertNotNull(result.getCreatedAt());
//     }

//     @Test
//     public void testCreateWorkflowDatabaseError() {
//         // given
//         Workflow workflow = new Workflow();
//         when(workflowRepository.save(workflow))
//                 .thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

//         // when
//         assertThrows(DatabaseCommunicationException.class, () -> workflowService.createWorkflow(workflow));
//     }

// }