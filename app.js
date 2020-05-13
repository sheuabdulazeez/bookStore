class Book{
constructor(title, author, isbn){
this.title = title;
this.author = author;
this.isbn = isbn;
}


}

class UI{
//Clear form fields
static clearFormField(title, author, isbn){
title.value = "";
author.value= "";
isbn.value ="";
}
static alertMessage(message, format){
const div = document.createElement("div");
div.appendChild(document.createTextNode(message));
div.className = 'alert alert-'+format;

const container = document.querySelector('.container');
const form = document.querySelector('#book-form');

container.insertBefore(div,form);
setTimeout(()=>{document.querySelector('.alert').remove()}, 2000);
}

static displayBooks(){
const books = Store.getBooks();
JSON.parse(books).forEach((book) => UI.addBookToList(book))
}
static addBookToList(book){
const list = document.querySelector('#book-list');
const row = document.createElement('tr');

row.innerHTML = '<td>'+book.title+
'</td><td>'+book.author+
'</td><td>'+book.isbn+
'</td><td class="btn btn-danger btn-sm delete">X</td>';

list.appendChild(row);
}
static removeBook(e){
e.parentElement.remove();
this.alertMessage('Book removed','success');
}


}

class Store{

static getBooks(){

let books;
if(localStorage.getItem('books') === null){
books = [];
}else{
books = localStorage.getItem('books');
}
return books;
}

static addBook(book){
const books = JSON.parse(localStorage.getItem('books'));
books.push(book);
localStorage.setItem('books',JSON.stringfy(books));

}
static removeBook(isbn){
const books = JSON.parse(localStorage.getItem('books'));
if(books !== null){
books.forEach((book, index) => {
if(book.isbn === isbn){
books.splice(index, 1);
}

});
}



localStorage.setItem('books',JSON.stringfy(books));
}
}




//Event to add books to the table
document.addEventListener('DOMContentLoaded',UI.displayBooks());

//Get form data to store
document.querySelector('#book-form').addEventListener('submit',(e) => {
e.preventDefault();

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const isbn = document.querySelector("#isbn");

if(title.value === "" || author.value === "" || isbn.value === ""){
UI.alertMessage("All field must be filled","danger");

}else{

const book = new Book(title.value, author.value, isbn.value);

//add to UI
e.target.addEventListener('click', (book) => {
Store.addBook(book);
UI.addBookToList(book)

});

//alert Success for added books
UI.alertMessage('Book Added','success');

UI.clearFormField(title, author, isbn);


}

});

//Delete a book
document.querySelector('#book-list').addEventListener('click',(e) =>{
if(e.target.innerHTML === 'X'){
Store.removeBook(e.target.previousSibling.innerHTML);

UI.removeBook(e.target);
}


});












