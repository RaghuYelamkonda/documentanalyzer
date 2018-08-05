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


Build the client application using ng build --base-href .
Run the application as springbbot app

//TODO - Exclude web folder as part of build