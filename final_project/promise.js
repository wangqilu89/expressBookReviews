const fetch = require("node-fetch");

const baseUrl = "https://wangqilu89-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/"; // Change this if needed

// Function to get book by ISBN
const getBooks = (isbn) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

const getBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/isbn/${isbn}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

// Function to get books by Author
const getBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/author/${author}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

// Function to get books by Title
const getBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/title/${title}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

// Execute all promises
const isbn = "1";
const author = "Unknown";
const title = "One Thousand and One Nights";

Promise.all([
    getBooks(),
    getBookByISBN(isbn),
    getBooksByAuthor(author),
    getBooksByTitle(title)
])
.then(results => {
    console.log("Task 10", results[0]);
    console.log("Task 11", results[1]);
    console.log("Task 12", results[2]);
    console.log("Task 13", results[3]);
})
.catch(error => console.error("Error:", error));