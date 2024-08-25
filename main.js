// Enable strict mode
"use strict";

// An empty array for storing books
const myLibrary = [];

// Constructor for creating new book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // Method for returning book as a string when book.info() is called
    this.info = function() {
        const readOrNot = this.read ? "read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readOrNot}`;
    };
}

// Function for adding new book to user's collection
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    showBooks();
}

// Function to display all books in user's collection
function showBooks() {
    const bookContainer = document.querySelector('.container');
    bookContainer.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const div = document.createElement('div');
        div.classList.add('book');
        div.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <p class="read-status" tooltip="Click to change read status"><span>${book.read ? 'Read' : 'Not Read'}</span></p>
        <svg class="book-remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="cursor:pointer; width: 24px; height: 24px; margin-left: 200px;"><title>Remove book</title><path d="M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M22.54 16.88L21.12 15.47L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88Z" /></svg>
        `;
        bookContainer.appendChild(div);

        // Event listener that toggles read status when clicked on
        const statusElement = div.querySelector('.read-status');
        statusElement.addEventListener('click', () => {
            book.read = !book.read; 
            showBooks(); // Reload book display to reflect changes
        });

        // Event listener that removes book from collection when icon is clicked
        const removeBtn = div.querySelector('.book-remove');
        removeBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1); 
            showBooks(); // Reload book display to reflect changes
        });
    });
}

// Getting element IDs to display modal dialog
const showButton = document.getElementById("showDialog");
const formDialog = document.getElementById("formDialog");
const confirmBtn = formDialog.querySelector("#confirm-button");

// Event listener to display modal dialog when "New Book" button is clicked 
showButton.addEventListener("click", () => {
    formDialog.showModal();
  });
  
// Event listener for adding new book when "confirm" button is clicked
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // Use values from input fields to display new book 
    const title = document.getElementById("title").value;
    const author = document.getElementById("name").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("status").checked;

    addBookToLibrary(title, author, pages, read); // Call function to push new book into the empty array and display it
    formDialog.close(); // Close the modal dialog

    // Clear all input fields for the next book
    document.getElementById("title").value = '';
    document.getElementById("name").value = '';
    document.getElementById("pages").value = '';
    document.getElementById("status").checked = false; 
});



