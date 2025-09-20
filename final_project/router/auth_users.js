const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Check if the username is valid
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// Authenticate the user (verify username and password)
const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

// only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign({ username }, 'yourSecretKey');
      req.session.accessToken = accessToken;  // Store the token in the session
      return res.status(200).json({ message: "Login successful", token: accessToken });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } else {
    return res.status(400).json({ message: "Username and password are required" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Review code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Ensure you close all the functions and objects properly.
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
