package com.group1.oopproject.user.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.fail;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.repository.UserRepository;
import com.group1.oopproject.exception.DatabaseCommunicationException;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import com.group1.oopproject.exception.UserNotFoundException;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Test
    public void testGetAllUsersSuccess() {

        // given
        List<User> users = new ArrayList<>();
        users.add(new User());
        users.add(new User());

        when(userRepository.findAll()).thenReturn(users);

        // when
        List<User> result = userService.getAllUsers();

        // then
        assertEquals(result, users);
    }

    @Test
    public void testGetAllUsersNotFound() {

        // given
        when(userRepository.findAll()).thenReturn(Collections.emptyList());

        // when
        try {
            //when
            userService.getAllUsers();
            fail("Expected UserNotFoundException to be thrown");
        } catch (UserNotFoundException e) {
            assertEquals("No users found in the database", e.getMessage());

        }
    }

    @Test
    public void testGetAllUsersDatabaseError() {

        //given
        when(userRepository.findAll()).thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> userService.getAllUsers());
    }

    @Test
    public void testFindUserByIdSuccess() {
        // given
        User user = new User();
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        // when
        User result = userService.findUserById(user.getId());

        // then
        assertEquals(result, user);
    }

    @Test
    public void testFindUserByIdFormNotFound() {
        // given
        String id = "some-id";
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        // when
        try {
            userService.findUserById(id);
            fail("Expected UserNotFoundException to be thrown");
        } catch (UserNotFoundException e) {
            assertEquals("User not found with id: " + id, e.getMessage());
        }
    }

    @Test
    public void testFindUserByIdDatabaseError() {
        // given
        String id = "some-id";
        when(userRepository.findById(id))
                .thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> userService.findUserById(id));

    }

    @Test
    public void testCreateUserSuccess() {
        // given
        User user = new User();
        when(userRepository.save(user)).thenReturn(user);

        // when
        User result = userService.createUser(user);

        // then
        assertEquals(result, user);
        assertNotNull(result.getCreatedAt());
    }

    @Test
    public void testCreateUserDatabaseError() {
        // given
        User user = new User();
        when(userRepository.save(user))
                .thenThrow(new UncategorizedMongoDbException("Error communicating with database", null));

        // when
        assertThrows(DatabaseCommunicationException.class, () -> userService.createUser(user));
    }
}
