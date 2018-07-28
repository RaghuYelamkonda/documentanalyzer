package com.gaurdx.controller;

import com.gaurdx.model.Document;
import com.gaurdx.repositories.DocumentsRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/document")
public class DocumentController {

    @Autowired
    private DocumentsRepository repository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<Document> getDocumentByName(@PathVariable("id") String userId) {
        return repository.findByuserId(userId);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void modifyDocumentById(@PathVariable("id") ObjectId id, @Valid @RequestBody Document Document) {
        //TODO -  validate Document and id are same. We may not need ID at all for this. Remove this after the testing
        repository.save(Document);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Document createDocument(@Valid @RequestBody Document document) {
        document.setId(ObjectId.get().toHexString());
        repository.save(document);
        return document;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteDocument(@PathVariable String id) {
        Optional<Document> byId = repository.findById(id);
        byId.ifPresent(document -> repository.delete(document));
    }
}
