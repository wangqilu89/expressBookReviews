const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    var filtered = users.filter((user) => {return user.username == username})
    return (filtered.length == 0)
//write code to check is the username is valid
}

const authenticatedUser = (token)=> {
    try {
        if (token) {
            var decoded = jwt.verify(token, 'secret');
            return {login: true,token: token,data:decoded}
        }
        else {
            throw new Error("No token")
        }
    }
    catch (e) {
        return {login: false,token: token,data:{username:'',password:''}}
    }        

    //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const name = req.body.username;
    const password = req.body.password;

    let isPresent = false;
    let isPresentIndex = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i]['username'] === name
            && users[i]['password'] === password) {

            // If both are correct so make 
            // isPresent variable true
            isPresent = true;

            // And store the data index
            isPresentIndex = i;

            // Break the loop after matching successfully
            break;
        }
    }
    if (isPresent) {

        const token = jwt.sign(users[isPresentIndex], "secret");

        // Pass the data or token in response
        res.status(200).json({
            login: true,
            token: token,
            data: database[isPresentIndex],
        });
    } else {

        // If isPresent is false return the error
        res.status(300).json({
            login: false,
            error: "please check name and password.",
        });
    }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const token = req.body.token;
  const message = req.body.message;
  const isbn = req.params.isbn
    let userlogin = authenticatedUser(token)
    if (userlogin['login']) {
        books[isbn]['reviews'][userlogin['data']['username']] = message
       
        return res.status(300).json({message: "Message Saved"});
    }  
    else {
        return res.status(300).json({message: "User Authentication Failed"});
    }
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const token = req.body.token;
    const message = req.body.message;
    const isbn = req.params.isbn
      let userlogin = authenticatedUser(token)
      if (userlogin['login']) {
        delete books[isbn]['reviews'][userlogin['data']['username']]
          
         
        return res.status(300).json({message: "Message Deleted"});
      }  
      else {
          return res.status(300).json({message: "User Authentication Failed"});
      }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
