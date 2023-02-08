package com.group1.oopproject.user.controller;

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

import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.service.UserService;
import com.group1.oopproject.exception.UserNotFoundException;
import com.group1.oopproject.exception.DatabaseCommunicationException;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Test
    public void testGetAllUsers_Success() {
        List<User> users = List.of(new User(), new User());
        when(userService.getAllUsers()).thenReturn(users);
        ResponseEntity<List<User>> response = userController.getAllUsers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
    }

    @Test
    public void testGetAllUsers_UserNotFound() {
        when(userService.getAllUsers()).thenThrow(UserNotFoundException.class);
        ResponseEntity<List<User>> response = userController.getAllUsers();
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testGetALlUsers_DatabaseCommunicationException() {
        when(userService.getAllUsers()).thenThrow(DatabaseCommunicationException.class);
        ResponseEntity<List<User>> response = userController.getAllUsers();
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    public void testFindUserById_whenFormFound_shouldReturn200OK() {

        // Arrange
        User expectedUser = new User();
        expectedUser.setId("1");
        expectedUser.setName("Test User");
        when(userService.findUserById("1")).thenReturn(expectedUser);

        // Act
        ResponseEntity<User> response = userController.findUserById("1");

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedUser, response.getBody());

    }

    @Test
    public void testFindUserById_whenFormNotFound_shouldReturn404NotFound() {
        // Arrange
        when(userService.findUserById("1")).thenThrow(new UserNotFoundException("User not found"));

        // Act
        ResponseEntity<User> response = userController.findUserById("1");

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testFindUserById_whenDatabaseCommunicationError_shouldReturn500InternalServerError() {
        // Arrange
        when(userService.findUserById("1")).thenThrow(new DatabaseCommunicationException("Error communicating with database", null));

        // Act
        ResponseEntity<User> response = userController.findUserById("1");

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testCreateUserSuccess() {
        User user = new User();
        when(userService.createUser(user)).thenReturn(user);

        ResponseEntity<User> response = userController.createUser(user);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    public void testCreateUserDatabaseCommunicationException() {
        User user = new User();
        when(userService.createUser(user))
                .thenThrow(new DatabaseCommunicationException("Error communicating with database", null));

        ResponseEntity<User> response = userController.createUser(user);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(null, response.getBody());
    }
}
