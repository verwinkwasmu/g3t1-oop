package com.group1.oopproject.archive.repository;

import com.group1.oopproject.archive.entity.ArchiveDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ArchiveRepository extends MongoRepository<ArchiveDocument, String> {

    List<ArchiveDocument> findByCollection(String collection);
}
