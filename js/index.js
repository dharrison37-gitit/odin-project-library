"use strict";

const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? "read it" : "not read yet"}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks(books) {
    const container = document.querySelector(".container");
    books.map((book) => {
        let card = document.createElement("div");
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

        let read = document.createElement("div");
        read.className = "read";
        read.setAttribute("data-status", book.read);
        read.textContent = `Read it? ${book.read ? "yes" : "not yet"}`;
        card.appendChild(read);

        container.appendChild(card);
    });
}

addBookToLibrary("The Reason for God", "Tim Keller", 507, true);
addBookToLibrary("Fairy Tales", "J.B. Jones", 200, false);
addBookToLibrary("The Reason for God", "Tim Keller", 507, true);
addBookToLibrary("Fairy Tales", "J.B. Jones", 200, false);

displayBooks(myLibrary);
