"use strict";

const myLibrary = [];
displayBooks(myLibrary);

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

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

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-container";

    let read = document.createElement("button");
    read.className = "read";
    read.setAttribute("data-status", book.read);
    read.textContent = `${book.read ? "Read : Yes" : "Read : No"}`;
    read.addEventListener("click", (e) => {
      book.toggleRead();
      displayBooks(myLibrary);
    });
    buttonContainer.appendChild(read);

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      const indexToRemove = myLibrary.findIndex((obj) => obj.id === e.target.parentNode.dataset.id);

      myLibrary.splice(indexToRemove, 1);
      displayBooks(myLibrary);
    });
    buttonContainer.appendChild(deleteButton);

    card.appendChild(buttonContainer);

    container.appendChild(card);
  });
}

const form = document.querySelector("form");
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = Number(formData.get("pages"));
  const read = formData.has("read");
  const errorMessage = document.querySelector(".error-message");
  const validData = validateBookData(title, author, pages);

  if (!validData.isValid) {
    errorMessage.classList.add("active");
    errorMessage.textContent = validData.message;
    return;
  } else {
    errorMessage.classList.remove("active");
    addBookToLibrary(title, author, pages, read);
    dialog.close();

    displayBooks(myLibrary);

    form.reset();
  }
});

function validateBookData(title, author, pages, minLength = 10) {
  if (!title || typeof title !== "string" || title.trim() === "") {
    return { isValid: false, message: "Title of book is required" };
  }

  if (!author || typeof author !== "string" || author.trim() === "") {
    return { isValid: false, message: "Author of book is required" };
  }

  if (!pages || typeof pages !== "number") {
    return { isValid: false, message: "Pages must be a number" };
  }

  if (pages < minLength) {
    return { isValid: false, message: `Pages must be at least ${minLength}` };
  }

  return { isValid: true };
}

//#region Dummy Data for display

function addDummyData() {
  addBookToLibrary("Wherever you go, there you are", "Jon Kabat-Zinn PhD", 309, false);
  addBookToLibrary("Think Like a Programmer", "V. Anton Spraul", 256, true);
  addBookToLibrary("The Four Loves", "C. S. Lewis", 192, false);
  addBookToLibrary("The Reason for God", "Tim Keller", 251, true);

  displayBooks(myLibrary);
}

addDummyData();
