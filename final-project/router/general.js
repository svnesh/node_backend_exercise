const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => { 
  try{
    let username = req.body.username;
    let password = req.body.password;

    if(!username && !password){
      return res.status(400).json({message: "Username or password is empty"});
    }
    if(!isValid(username)){
      return res.status(400).json({message: "Username already exists"});
    }

    users.push({"username":username, "password":password})
    return res.status(201).json({message: `User ${username} added successfully!`});
  }catch(err){
    return res.status(400).json(err);  
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  try{
    return res.status(200).json(books);
  }catch(err){
    return res.status(400).json({message: err});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let books_obj = Object.values(books);
  try{
    let filtered_book = books_obj.filter((book) => { 
      return req.params.isbn === book.isbn 
    })
    return res.status(200).json(filtered_book);
  }catch(err){
    return res.status(400).json({message: err});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let books_obj = Object.values(books);
  try{
    let filtered_author = books_obj.filter((book)=>{
      return req.params.author === book.author
    })
    return res.status(200).json(filtered_author);
  }catch(err){
    res.status(400).json(err);
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let books_obj = Object.values(books);
  try{
    let filtered_title = books_obj.filter((book)=>{
      return req.params.title === book.title
    })
    return res.status(200).json(filtered_title);
  }catch(err){
    res.status(400).json(err);
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let books_obj = Object.values(books);
  try{
    let filtered_book = books_obj.filter((book) => { 
      return req.params.isbn === book.isbn 
    });
    return res.status(200).json(filtered_book[0].reviews);
  }catch(err){
    return res.status(400).json({message: err});
  }
});

module.exports.general = public_users;
