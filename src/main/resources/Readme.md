1. Install MongoDB (Optional if there is an existing MongoDB)
2. Create a database which can be used by this application (Optional if you have one)
    In this code we are assuming that there is a database documentanalyzer which can be create using "use documentanalyzer" command

3. Create a user if already not available (This will be used to connect to mongo db. Please note that this is nothing related with this application)
    If it is a fresh instalation create an user with write permissions as shown below and configure the user name and password in application.properties file
    db.createUser(
       {
         user: "Raghu",
         pwd: "manager",
         roles: [ "readWrite", "dbAdmin" ]
       }
    );

4. Create an user using mongodb shell or rest api for application (Note that this user is application specific)

     Mongo Shell: db.Users.insert({"id":1,"name":"admin","roleDescription":"Admin User","location":"USA", "password":"manager"})

     Rest Api:
     url: http://localhost:8080/documentanalyzer/api/v1/user/
     method: Post
     body: {"id":1,"name":"admin","roleDescription":"Admin User","location":"USA", "password":"manager"}
     Headers: Content-Type value application/json

DB setup is done
-------------------------------------------

For client

1. Install node
2. Run npm install from command prompt at src\main\resources\web
3. npm start

Open browser for url: http://localhost:4200/

Note that client makes backend call using the url mentioned at src\main\resources\web\proxy.config.json. It is configured to call localhost
    Url /api/* goes to http://localhost:8080/documentanalyzer/api/*

Build the client application using ng build --base-href .
Run the application as springbbot app

//TODO - Exclude web folder as part of build