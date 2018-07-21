package com.gaurdx.repositories;

import com.gaurdx.model.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DocumentsRepository extends MongoRepository<Document, String> {
    Document findByName(String _name);

    List<Document> findByuserId(String _userId);
}