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

const authenticatedUser = (username,password)=> {
    var result = !(isValid(username))
    if (result) {
        var filtered = users.filter((user) => {return user.username == username})
        result = (filtered[0]['password'] == password)
    }
    return result
    //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
 var msg = ((!isValid(username))?("Wrong Username"):((!authenticatedUser(req.query.username,req.query.password))?("Wrong Password"):("Login Successfully")))
 
  return res.status(300).json({message: msg});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
