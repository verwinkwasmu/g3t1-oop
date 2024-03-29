package com.group1.oopproject.user.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.util.BsonUtils;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private UserType userType;
    @CreatedDate
    private LocalDateTime createdAt;

}