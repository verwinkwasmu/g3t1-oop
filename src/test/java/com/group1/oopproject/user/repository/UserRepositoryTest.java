package com.group1.oopproject.user.repository;

import java.util.Optional;
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

import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.entity.UserType;

@ExtendWith(MockitoExtension.class)
@DataMongoTest
public class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User("1", "John Doe", "johndoe@email.com","johnny", UserType.ADMIN, null);
        when(userRepository.findById(anyString())).thenReturn(Optional.of(user));

    }

    @AfterEach
    void tearDown() {
        userRepository.delete(user);
    }

    @Test
    void findUserById_whenUserExists_returnsUser() {
        Optional<User> result = userRepository.findById("1");
        assertThat(result).isPresent().get().isEqualTo(user);
    }

    @Test
    void findUserById_whenUserDoesNotExist_returnsEmpty() {
        when(userRepository.findById("2")).thenReturn(Optional.empty());
        Optional<User> result = userRepository.findById("2");
        assertThat(result).isEmpty();
    }
}