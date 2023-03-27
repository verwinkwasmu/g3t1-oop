package com.group1.oopproject.archive.entity;

import lombok.Builder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Document(collection = "archive")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArchiveDocument {

    @Id
    private String id;
    private String collection;
    private String deletedBy;
    private Object data;

    @CreatedDate
    private LocalDateTime deletedAt;
}
