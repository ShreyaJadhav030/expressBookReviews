const express = require('express');
let books = require("./booksdb.js");  // Import the books database
const axios = require('axios');  // If you decide to use Axios for API calls
const public_users = express.Router();

// Task 1: Get the list of all books available in the shop
public_users.get('/', async function (req, res) {
  try {
    const allBooks = Object.values(books);  // Get all books from the booksdb.js object
    return res.status(200).json(allBooks);  // Return the books as JSON
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books list" });
  }
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;  // Get ISBN from the request parameters
    const book = books[isbn];  // Search the book in the booksdb.js by ISBN
    if (book) {
      return res.status(200).json(book);  // Return the book if found
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

// Task 3: Get book details based on the author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author.toLowerCase();  // Get the author name and make it case-insensitive
    const booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase().includes(author));
    if (booksByAuthor.length > 0) {
      return res.status(200).json(booksByAuthor);  // Return books by the author
    } else {
      return res.status(404).json({ message: "No books found by this author" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }
});

// Task 4: Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title.toLowerCase();  // Get the title and make it case-insensitive
    const booksByTitle = Object.values(books).filter(book => book.title.toLowerCase().includes(title));
    if (booksByTitle.length > 0) {
      return res.status(200).json(booksByTitle);  // Return books by the title
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
  }
});

// Task 5: Get book reviews based on ISBN
public_users.get('/review/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
      return res.status(200).json(book.reviews);  // Return the reviews of the book
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book reviews" });
  }
});

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please provide both username and password" });
  }
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Task 10: Using Axios to get the list of books (alternative if fetching from external API)
public_users.get('/axios-books', async function (req, res) {
  try {
    const response = await axios.get('https://api.example.com/books');  // Example external API
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books from external API" });
  }
});

// Task 11: Using Axios to get book details based on ISBN (example using Axios)
public_users.get('/axios/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`https://api.example.com/books/${isbn}`);  // Example external API
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});

// Task 12: Get book details based on Author using Axios (this was Task 3 but with Axios)
public_users.get('/axios/author/:author', async function (req, res) {
  try {
    const author = req.params.author.toLowerCase();
    const response = await axios.get(`https://api.example.com/books/author/${author}`);  // Example external API
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author from external API" });
  }
});

// Task 13: Get book details based on Title using Axios (this was Task 4 but with Axios)
public_users.get('/axios/title/:title', async function (req, res) {
  try {
    const title = req.params.title.toLowerCase();
    const response = await axios.get(`https://api.example.com/books/title/${title}`);  // Example external API
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title from external API" });
  }
});

module.exports.general = public_users;
