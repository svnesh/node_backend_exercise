const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  let userNameExists = users.filter((user)=>{
    return user.username === username
  })
  if(userNameExists.length > 0){
    return false
  }
  else{
    return true
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let authUser = users.filter((user) => {
    return user.username === username && user.password === password
  })

  if(authUser.length > 0){ return true }
  else { return false }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  if(!username && !password) { return res.status(400).json("Username or password is empty"); }

  if(authenticatedUser(username, password)){
    let token = jwt.sign({
      data: username
    }, "mysecret", {expiresIn: 60*60})

    req.session.authorization = {
      token, username
    }
    return res.status(200).json('User logged in successfully');
  }
  else{
    return res.status(400).json('Username does not exists');
  }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

  const username = req.session.authorization['username'];
  const reviewText = req.body.reviews;
  let oBooks = Object.values(books);

  let filtered_book = oBooks.filter((book) => {
    return req.params.isbn === book.isbn
  })

  if(filtered_book.length > 0){
    let bkReviews = filtered_book[0].reviews;
    let rUsers = Object.keys(bkReviews);

    let filtered_revuser = rUsers.filter((user) =>{
      return username === user;
    })
    if(filtered_revuser.length > 0){
      delete bkReviews[username];
      bkReviews[username] = {"texts": reviewText};
    }else{
      bkReviews[username] = {"texts": reviewText};
    }

    return res.status(201).json(`Review text ${reviewText} added by user ${username}`);
  }
  else{
    return res.status(400).json("Book with isbn not available");
  }

});

//Delete a review
regd_users.delete('/auth/review/:isbn', (req,res)=>{
  const username = req.session.authorization['username'];
  let oBooks = Object.values(books);

  let filtered_book = oBooks.filter((book) => {
    return req.params.isbn === book.isbn
  })

  if (filtered_book.length > 0){
    let revBook = filtered_book[0].reviews;
    let revUser = Object.keys(revBook);

    let filtered_user = revUser.filter((user) => {
      return user === username
    });

    console.log(filtered_user);

    if (filtered_user.length == 1){
      delete revBook[username];
      return res.status(200).json("Review deleted successfully");  
    }
    else{
      return res.status(400).json("Not authorized to delete other user review");  
    }
  }
  else{
    return res.status(400).json("Book with isbn not available");
  }

})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
