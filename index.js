const formBtn = document.getElementById('book-btn');
const form = document.getElementById('form-div');
const closeIn = document.getElementById('close-input');
const titleElem = document.getElementsByName('book_title')[0];
const authorElem = document.getElementsByName('book_author')[0];
const pagesElem = document.getElementsByName('book_pages')[0];
const bookDisplay = document.getElementById('book-display');
const formElem = document.getElementById('form');

const lib = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Book.prototype.changeReadStatus = function () {
  if (this.hasRead === true) {
    this.hasRead = false;
  } else {
    this.hasRead = true;
  }
};

function setBookDetails(index) {
  lib[index].title = titleElem.value;
  lib[index].author = authorElem.value;
  lib[index].pages = pagesElem.value;
}

function removeBook(btn) {
  const bookIndex = btn.closest('.book-item').getAttribute('data-index');
  btn.closest('.book-item').remove();
  delete lib[bookIndex];
}

function changeStatus(btn) {
  const parent = btn.closest('.book-item');
  const index = parent.getAttribute('data-index');

  lib[index].changeReadStatus();

  if (!lib[index].hasRead) {
    parent.classList.remove('status-read');
    btn.classList.remove('status-btn-read');
    btn.textContent = 'Not Read';
  } else {
    parent.classList.add('status-read');
    btn.classList.add('status-btn-read');
    btn.textContent = 'Read';
  }
}

function createBook() {
  for (let i = 0; i < lib.length; i += 1) {
    if (lib[i] !== undefined && lib[i].isDisplayed !== true) {
      const bookDiv = document.createElement('div');
      const buttonDiv = document.createElement('div');
      const bookHead = document.createElement('p');
      const bookBody = document.createElement('p');
      const numberPages = document.createElement('p');
      const remove = document.createElement('button');
      const hasRead = document.createElement('button');

      setBookDetails(i);

      bookHead.textContent = lib[i].title;
      bookBody.textContent = `By: ${lib[i].author}`;
      numberPages.textContent = `Pages: ${lib[i].pages}`;
      remove.textContent = 'Remove';
      hasRead.textContent = 'Not Read';

      remove.classList.add('rem-btn');
      hasRead.classList.add('read-btn');
      bookHead.classList.add('book-head');
      bookDiv.classList.add('book-item');
      bookDiv.setAttribute('data-index', `${i}`);
      buttonDiv.classList.add('btn-div');

      remove.addEventListener('click', () => {
        removeBook(remove);
      });

      hasRead.addEventListener('click', () => {
        changeStatus(hasRead);
      });

      bookDiv.appendChild(bookHead);
      bookDiv.appendChild(bookBody);
      bookDiv.appendChild(numberPages);
      buttonDiv.appendChild(remove);
      buttonDiv.appendChild(hasRead);
      bookDiv.appendChild(buttonDiv);

      bookDisplay.appendChild(bookDiv);
      lib[i].isDisplayed = true;
    }
  }
}

function openForm() {
  const bookItems = document.querySelectorAll('.book-item');
  bookItems.forEach((item) => {
    item.classList.add('hide-item');
  });
  form.classList.remove('hidden');
  form.classList.add('flex');
  formBtn.classList.add('hidden');
}

function closeForm() {
  const bookItems = document.querySelectorAll('.book-item');
  bookItems.forEach((item) => {
    item.classList.remove('hide-item');
  });
  form.classList.remove('flex');
  form.classList.add('hidden');
  formBtn.classList.remove('hidden');
}

function addBookToLibrary() {
  let i = 0;
  do {
    if (lib[i] === undefined) {
      lib[i] = Object.create(Book.prototype);
      break;
    }
    i += 1;
  } while (true);
  closeForm();
  createBook();
}

closeIn.addEventListener('click', () => {
  closeForm();
});

formBtn.addEventListener('click', () => {
  openForm();
});

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  formElem.reset();
});
