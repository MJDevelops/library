const formBtn = document.getElementById('book-btn');
const form = document.getElementById('form-div');
const closeIn = document.getElementById('close-input');
const titleElem = document.getElementsByName('book_title')[0];
const authorElem = document.getElementsByName('book_author')[0];
const pagesElem = document.getElementsByName('book_pages')[0];
const bookDisplay = document.getElementById('book-display');
const formElem = document.getElementById('form');

const lib = [];

function Book(title, author, pages, isDisplayed, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isDisplayed = isDisplayed;
  this.hasRead = hasRead;
}

function removeBook(btn) {
  const bookIndex = btn.closest('.book-item').getAttribute('data-index');
  btn.closest('.book-item').remove();
  lib.splice(bookIndex, 1);
}

function changeStatusColor(btn) {
  const parent = btn.closest('.book-item');
  const index = parent.getAttribute('data-index');

  if (lib[index].hasRead !== true) {
    lib[index].hasRead = true;
    parent.classList.add('status-read');
    btn.classList.add('status-btn-read');
    btn.textContent = 'Not Read';
  } else {
    lib[index].hasRead = false;
    btn.classList.remove('status-btn-read');
    parent.classList.remove('status-read');
    btn.textContent = 'Read';
  }
}

function displayBooks() {
  for (let i = 0; i < lib.length; i += 1) {
    if (lib[i].isDisplayed !== true) {
      const bookDiv = document.createElement('div');
      const buttonDiv = document.createElement('div');
      const bookHead = document.createElement('p');
      const bookBody = document.createElement('p');
      const numberPages = document.createElement('p');
      const remove = document.createElement('button');
      const hasRead = document.createElement('button');
      const titleLib = lib[i].title;
      const authorLib = lib[i].author;
      const pagesLib = lib[i].pages;

      bookHead.textContent = titleLib;
      bookBody.textContent = `By: ${authorLib}`;
      numberPages.textContent = `Pages: ${pagesLib}`;
      remove.textContent = 'Remove';
      hasRead.textContent = 'Read';

      remove.classList.add('rem-btn');
      hasRead.classList.add('read-btn');
      bookHead.classList.add('book-head');

      remove.addEventListener('click', () => {
        removeBook(remove);
      });

      hasRead.addEventListener('click', () => {
        changeStatusColor(hasRead);
      });

      bookDiv.appendChild(bookHead);
      bookDiv.appendChild(bookBody);
      bookDiv.appendChild(numberPages);
      buttonDiv.appendChild(remove);
      buttonDiv.appendChild(hasRead);
      bookDiv.appendChild(buttonDiv);
      bookDiv.setAttribute('data-index', `${i}`);
      bookDiv.classList.add('book-item');
      buttonDiv.classList.add('btn-div');
      bookDisplay.appendChild(bookDiv);
      lib[i].isDisplayed = true;
    }
  }
}

function addBookToLibrary() {
  lib.push(new Book(titleElem.value, authorElem.value, pagesElem.value, false, false));
  form.classList.add('hidden');
  formBtn.classList.remove('hidden');
  displayBooks();
}

closeIn.addEventListener('click', () => {
  form.classList.add('hidden');
  formBtn.classList.remove('hidden');
});

formBtn.addEventListener('click', () => {
  form.classList.remove('hidden');
  form.classList.add('flex');
  formBtn.classList.add('hidden');
});

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  formElem.reset();
});
