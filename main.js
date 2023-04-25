/* eslint-disable  */
const addBookForm = document.getElementById('add-book-form');
const booksList = document.getElementById('books-list');

let books = JSON.parse(localStorage.getItem('books')) || [];

// display the books list 
books.forEach((book) => {
  const bookElement = createBookElement(book.title, book.author);
  booksList.appendChild(bookElement);
});

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the input values
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const author = authorInput.value;

  // Add the new book
  const newBook = { title, author };
  books.push(newBook);

  // Save the updated books array
  localStorage.setItem('books', JSON.stringify(books));

  const bookElement = createBookElement(title, author);
  booksList.appendChild(bookElement);

  // Reset the form
  addBookForm.reset();
});

// function to create a book element
function createBookElement(title, author) {
  const bookApp = document.createElement('div');
  bookApp.classList.add('book');
  bookApp.innerHTML = `
        <p>${title}</p>
        <p>${author}</p>
        <button class="remove-btn">Remove</button>
        <hr>
    `;

  const removeButton = bookApp.querySelector('.remove-btn');
  removeButton.addEventListener('click', () => {
    // Remove the book from the books array
    books = books.filter((book) => book.title !== title || book.author !== author);

    // Save the updated books array to local storage
    localStorage.setItem('books', JSON.stringify(books));

    bookApp.remove();
  });

  return bookApp;
}
