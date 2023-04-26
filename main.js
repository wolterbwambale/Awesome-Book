class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
  
  class Library {
    constructor() {
      this.books = JSON.parse(localStorage.getItem('books')) || [];
      this.addBookForm = document.getElementById('add-book-form');
      this.booksList = document.getElementById('books-list');
      this.addBookForm.addEventListener('submit', this.addBook.bind(this));
      this.render();
    }
  
    render() {
      this.booksList.innerHTML = '';
      this.books.forEach(book => {
        const bookElement = this.createBookElement(book);
        this.booksList.appendChild(bookElement);
      });
    }
  
    addBook(event) {
      event.preventDefault(); 
      const titleInput = document.getElementById('title');
      const authorInput = document.getElementById('author');
      const title = titleInput.value;
      const author = authorInput.value;
      const newBook = new Book(title, author);
      this.books.push(newBook);
      localStorage.setItem('books', JSON.stringify(this.books));
      const bookElement = this.createBookElement(newBook);
      this.booksList.appendChild(bookElement);
      this.addBookForm.reset();
    }
  
    removeBook(title, author) {
      this.books = this.books.filter(book => book.title !== title || book.author !== author);
      localStorage.setItem('books', JSON.stringify(this.books));
      this.render();
    }
  
    createBookElement(book) {
      const bookApp = document.createElement('div');
      bookApp.classList.add('book');
      bookApp.innerHTML = `
          <p>${book.title}</p>
          <p>${book.author}</p>
          <button class="remove-btn">Remove</button>
          <hr>
      `;
      const removeButton = bookApp.querySelector('.remove-btn');
      removeButton.addEventListener('click', () => {
          this.removeBook(book.title, book.author);
          bookApp.remove();
      });
      return bookApp;
    }
  }
  
  const library = new Library();  
