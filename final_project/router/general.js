const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    return res.status(300).json(books[req.params.isbn]);

    //return res.status(300).json({ISBN:req.params.isbn});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  var newObj = {}
  Object.keys(books).forEach((key,index) => {
    if (books[key]['author'] == req.params.author) {
        newObj[key] = books[key]
    }
  })
  return res.status(300).json(newObj);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  var newObj = {}
  Object.keys(books).forEach((key,index) => {
    if (books[key]['title'] == req.params.title) {
        newObj[key] = books[key]
    }
  })
  return res.status(300).json(newObj);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  return res.status(300).json(books[req.params.isbn]['reviews']);
  //return res.status(300).json(books[req.params.review]['reviews']);
});

module.exports.general = public_users;
