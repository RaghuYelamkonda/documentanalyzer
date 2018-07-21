package com.gaurdx.model;

import org.springframework.data.annotation.Id;

@org.springframework.data.mongodb.core.mapping.Document(collection = "Documents")
public class Document {

    @Id
    private String id;
    private String name;
    private String description;
    private String userId;

    public Document() {

    }

    public Document(String id, String name, String description, String user_id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userId = user_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
