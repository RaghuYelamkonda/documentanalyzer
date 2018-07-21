package com.gaurdx.repositories;

import com.gaurdx.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersRepository extends MongoRepository<User, String> {
    User findByName(String name);
}