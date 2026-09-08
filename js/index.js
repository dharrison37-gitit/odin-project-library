"use strict";

const myLibrary = [];
displayBooks(myLibrary);

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks(books) {
    const container = document.querySelector(".grid-container");
    container.textContent = "";
    books.map((book) => {
        let card = document.createElement("div");
        card.setAttribute("data-id", book.id);
        card.className = "card";

        let title = document.createElement("h2");
        title.className = "card-title";
        title.textContent = book.title;
        card.appendChild(title);

        let author = document.createElement("div");
        author.className = "author";
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);

        let pages = document.createElement("div");
        pages.className = "pages";
        pages.textContent = `Number of pages: ${book.pages}`;
        card.appendChild(pages);

        let read = document.createElement("button");
        read.className = "read";
        read.setAttribute("data-status", book.read);
        read.textContent = `${book.read ? "Read : Yes" : "Read : No"}`;
        read.addEventListener("click", (e) => {
            book.toggleRead();
            displayBooks(myLibrary);
        });
        card.appendChild(read);

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "Delete Book";
        card.appendChild(deleteButton);
        deleteButton.addEventListener("click", (e) => {
            const indexToRemove = myLibrary.findIndex(
                (obj) => obj.id === e.target.parentNode.dataset.id,
            );

            myLibrary.splice(indexToRemove, 1);
            displayBooks(myLibrary);
        });

        container.appendChild(card);
    });
}

const newBook = document.querySelector("#new-book");
const addBook = document.querySelector("#add-book");
const cancel = document.querySelector("#cancel");
const dialog = document.querySelector("#my-dialog");

newBook.addEventListener("click", (e) => {
    dialog.showModal();
});

cancel.addEventListener("click", (e) => {
    dialog.close();
});

addBook.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    const title = form.elements["title"].value;
    const author = form.elements["author"].value;
    const pages = form.elements["pages"].value;
    const read = form.elements["read"].checked;

    if (!title || !author) {
        return;
    } else {
        addBookToLibrary(title, author, pages, read);
        dialog.close();

        displayBooks(myLibrary);

        form.reset();
    }
});

//#region Dummy Data for display

function addDummyData() {
    addBookToLibrary(
        "Wherever you go, there you are",
        "Jon Kabat-Zinn PhD",
        309,
        false,
    );
    addBookToLibrary("Think Like a Programmer", "V. Anton Spraul", 256, true);
    addBookToLibrary("The Four Loves", "C. S. Lewis", 192, false);
    addBookToLibrary("The Reason for God", "Tim Keller", 251, true);

    displayBooks(myLibrary);
}

addDummyData();
