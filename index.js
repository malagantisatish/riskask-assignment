const express = require('express');
const app = express();
const {open} = require("sqlite");

const sqlite3 = require("sqlite3");

app.use(express.json()); // for parsing application/json

class Book {
    constructor(title, author, ISBN) {
        // Initialize attributes 
        this.title=title;
        this.author=author;
        this.ISBN=ISBN;
    }
    displayInfo() {
        // Display book information
      return `${this.title} by ${this.author} its ISBN was ${this.ISBN}`
    }
}

let myBook1 = new Book("satish life","satish",2021) // creating an object 
console.log(myBook1.displayInfo()) // printing book information 

class EBook extends Book {
    constructor(title, author, ISBN, fileFormat) {
        super(title, author, ISBN);
        // Initialize fileFormat
        this.fileFormat=fileFormat
    }
    displayInfo() {
        // Override to display eBook information
        return `${this.title} by ${this.author} its ISBN was ${this.ISBN} it file format was ${this.fileFormat}`
    }
}

let myBook2 = new EBook("satish life","satish",2021,"PDF")
console.log(myBook2.displayInfo())

class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        // Add book to library
        this.books.push(book) // I am using push() method so that it adds book item to books array
    }
    displayBooks() {
        // Display all books in library
        return this.books
    }
    searchByTitle(title) {
        // Search books by title
        /* In the below line i am using filter method to filter books array 
        by converting title and search input into lower case by using toLowerCase() method */  

        let filterList = this.books.filter(each=> each.title.toLowerCase().includes(title.toLowerCase())) 
        return filterList
    }
}

// API Endpoints
app.post('/addBook', async (req, res) => {
    // Logic to add a book
    const {title,author,ISBN,fileFormat } = request.body;
  const addBookToAnArray = `INSERT INTO 
  books (title, author, ISBN,file_format) 
        VALUES (${title}, '${author}', ${ISBN}, ${fileFormat})
        ;`;
  await db.run(addBookToAnArray);
  response.status(200);
  response.send("District Successfully Added");
});

const convertedData = data=>({
    title:data.title,
    author:data.author,
    ISBN:data.ISBN,
    fileFormat:data.file_format
})

app.get('/listBooks', async (req, res) => {
    // Logic to list books
    const getBooks = `SELECT * 
           FROM books;`;
  const booksArray = await db.all(getBooks);
  response.status(200);
  response.send(booksArray.map((each) => convertedData(each)));
});

app.delete('/deleteBook', async (req, res) => {
    // Logic to delete a book
    const { ISBN } = request.params;
    const deleteBookQuery = `DELETE FROM books
           WHERE ISBN=${ISBN};`;
    await db.run(deleteBookQuery);
    response.status(200);
    response.send("Book Removed");
});

// Start server

// Add exception handling as necessary
const path = require("path");
const dbPath = path.join(__dirname, "books.db");
let db = null

let initializationDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server starting at http://localhost:3001");
    });
  } catch (error) {
    console.log(`Error at ${error.message}`);
  }
};


initializationDBAndServer()





module.exports = app;