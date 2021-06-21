
let myLibrary ={}
let booknum = "1"
let closeButtons = document.querySelectorAll(".close")
let userResults = document.getElementById("user-results")
const newBookForm = document.getElementById("new-book")
const addBookButton = document.getElementById("add-book-button")
//const keys = Object.keys(defaultLibrary)

class Book{
    constructor(id, name, author, read=false, isbn=false, imgsrc){
    this.id = id
    this.name = name
    this.author = author
    this.read = read
    this.isbn = isbn
    this.dateAdded = new Date()
    this.imgsrc = imgsrc
    }
    print(){
        console.log(this.name, this.pages, this.read)
    }
    changeStatus(){
        this.read = true
    }    
}

function newBookObject(name, author, isbn, read){
    myLibrary[booknum] = new Book(name, author, isbn, read)
    booknum = (parseInt(booknum) +1).toString()
}
function newCard(book){
    let newcard = document.createElement('div')
    newcard.classList = "user-card"
    newcard.innerHTML = `<div class="close"><button>&times;</button></div><img src="${book.imgsrc}" class="avatar"> <div class="top info">${book.name} </div><div class="bottom info">${book.author} </div>`
    userResults.appendChild(newcard)    
    newcard.id = book.id
    const closeButton = newcard.querySelectorAll(".close")[0]
    closeButton.addEventListener('click', deleteCard)
}
const deleteCard = function(e){
    console.log(e.target.parentNode.parentNode)
    const card = e.target.parentNode.parentNode
    delete myLibrary[card.id]
    saveUserLibrary()
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
}
function pagereset(){
    localStorage.clear()
    booknum = "1"
}
function loadLibrary(library){
    const keys = Object.keys(library)
    keys.forEach(book=>{
        newCard(library[book])
    })
}

addBookButton.addEventListener('click',async (e)=>{
    e.preventDefault()
    let hasread
    if(newBookForm.cbox1.checked){hasread = true}
    let title = newBookForm.title.value
    let author = newBookForm.title.value 
    let isbn = newBookForm.isbn.value
    toggleBookModal()
    toggleBookModal(booksearchModal)
    results = await bookSearch(title, author, isbn)
    console.log(results)
    
    //myLibrary[booknum] = new Book (booknum, newBookForm.title.value, newBookForm.author.value, hasread)
    //newCard(myLibrary[booknum])
    //booknum = (parseInt(booknum)+1).toString()
    //console.log(myLibrary)
    //saveUserLibrary()
})



getUserLibrary()

if(!localStorage.getItem("myLibrary")){
    loadLibrary(defaultLibrary)
    myLibrary = defaultLibrary
    saveUserLibrary()
}else{
    loadLibrary(myLibrary)
}
