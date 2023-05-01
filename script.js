// book constructor function
function Book(title, author) {
  this.title = title;
  this.author = author;
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem("books")) || [];
    if (this.books.length === 0) {
      this.count = 0;
    } else {
      this.count = this.books.slice(-1)[0].id + 1;
    }
  }

  addBook(title, author, id) {
    const newBook = new Book(title, author);

    this.books.push(newBook);
    localStorage.setItem("books", JSON.stringify(this.books)); // save updated collection to localStorage
    this.displayBooks();
    this.count += 1;
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== parseInt(id, 10));
    localStorage.setItem("books", JSON.stringify(this.books)); // save updated collection to localStorage
    this.displayBooks();
  }

  displayBooks() {
    const bookList = document.querySelector("ul");

    bookList.innerHTML = "";
    this.books.forEach((book) => {
      const contain = document.createElement("li");
      contain.id = book.id;
      contain.innerHTML = `
         <div class='check'>
        <p>"${book.title}" by ${book.author}</p>
        <button class='remove-book-button'>Remove</button>
        </div>
        
        `;

      bookList.appendChild(contain);
    });
  }
}

const bookCollection = new BookCollection();
bookCollection.displayBooks();

const addBookForm = document.getElementById("add-book-form");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const id = bookCollection.count;
  bookCollection.addBook(titleInput.value, authorInput.value);
  titleInput.value = "";
  authorInput.value = "";
});

// event listener for remove book button click
document.addEventListener("click", (e) => {
  const target = e.target.closest(".remove-book-button");
  if (target) {
    const { id } = target.parentNode.parentNode;
    bookCollection.removeBook(id);
  }
});

// SPA

const list = document.querySelector(".list");
const add = document.querySelector(".add");
const contact = document.querySelector(".contact");

const showBook = document.querySelector(".show-book");
const addBook = document.querySelector(".add-book");
const contactSection = document.querySelector("#contact-section");

list.addEventListener("click", (e) => {
  e.preventDefault();
  list.classList.add("active");
  contact.classList.remove("active");
  add.classList.remove("active");
  showBook.style.display = "block";
  addBook.style.display = "none";
  contactSection.style.display = "none";
});
add.addEventListener("click", (e) => {
  e.preventDefault();

  add.classList.add("active");
  contact.classList.remove("active");
  list.classList.remove("active");
  showBook.style.display = "none";
  contactSection.style.display = "none";
  addBook.style.display = "block";
});
contact.addEventListener("click", (e) => {
  e.preventDefault();
  contact.classList.add("active");
  add.classList.remove("active");
  list.classList.remove("active");

  contactSection.style.display = "block";
  showBook.style.display = "none";
  addBook.style.display = "none";
});