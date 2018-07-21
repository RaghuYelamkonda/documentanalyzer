package com.gaurdx.controller;

import com.gaurdx.model.User;
import com.gaurdx.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/login")
public class LoginController {

    @Autowired
    private UsersRepository repository;

    @PostMapping()
    public ResponseEntity<User> login(@Valid @RequestBody Credentials credentials, HttpServletRequest request) {
        User byName = repository.findByName(credentials.userName);
        if(byName != null && byName.getPassword().equals(credentials.password)) {
            HttpSession session = request.getSession(true);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(byName);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(null);
    }

    public static class Credentials {
        String userName;
        String password;

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


}
