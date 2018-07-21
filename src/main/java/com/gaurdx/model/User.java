package com.gaurdx.model;

import org.springframework.data.annotation.Id;

@org.springframework.data.mongodb.core.mapping.Document(collection = "Users")
public class User {

    @Id
    private String id;
    private String name;
    private String roleDescription;
    private String location;
    private transient String password;

    public User() {

    }

    public User(String id, String name, String roleDescription, String location) {
        this.id = id;
        this.name = name;
        this.roleDescription = roleDescription;
        this.location = location;
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

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPassword() {
        return password;
    }
}
