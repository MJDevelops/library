const formBtn = document.getElementById('book-btn');
const form = document.getElementById('form-div');
const closeIn = document.getElementById('close-input');
const title = document.getElementsByName('book_title')[0];
const author = document.getElementsByName('book_author')[0];
const pages = document.getElementsByName('book_pages')[0];
const bookDisplay = document.getElementById('book-display');
const formElem = document.getElementById('form');

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
});

document.querySelectorAll('rem-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const att = btn.parentElement.getAttribute('data-index');
        btn.remove();
    });
});

let lib = [];

function Book(title, author, pages, isDisplayed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isDisplayed = isDisplayed;
}

function addBookToLibrary() {
    lib.push(new Book(title.value, author.value, pages.value, false));
    form.classList.add('hidden');
    formBtn.classList.remove('hidden');
    displayBooks();
}

function displayBooks() {
    for (let i = 0; i < lib.length; i++) {
        if (lib[i].isDisplayed !== true) {
            let div = document.createElement('div');
            let head = document.createElement('p');
            let bod = document.createElement('p');
            let num = document.createElement('p');
            let rem = document.createElement('button');
            let hasRead = document.createElement('button');
            const title = lib[i].title;
            const author = lib[i].author;
            const pages = lib[i].pages;

            head.textContent = title;
            bod.textContent = author;
            num.textContent = pages;
            rem.textContent = 'Remove';
            hasRead.textContent = 'Read';

            rem.classList.add('rem-btn');
            hasRead.classList.add('read-btn');
            
            rem.addEventListener('click', () => {
                const att = rem.parentElement.getAttribute('data-index');
                rem.parentElement.remove();
                lib.splice(att, 1);
            });
            
            div.appendChild(head);
            div.appendChild(bod);
            div.appendChild(num);
            div.appendChild(rem);
            div.appendChild(hasRead);
            div.setAttribute('data-index', `${i}`);
            div.classList.add('book-item');
            bookDisplay.appendChild(div);
            lib[i].isDisplayed = true;
        }
    }
}