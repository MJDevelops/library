const blurBody = document.querySelector('body');
const formBtn = document.getElementById('book-btn');
const form = document.getElementById('form-div');

formBtn.addEventListener('click', () => {
    blurBody.classList.add('blur-sm');
    form.classList.remove('hidden');
    form.classList.add('flex', 'filter-none');
});


let lib = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}