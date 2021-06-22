
let myLibrary ={}
let booknum = "1"
let closeButtons = document.querySelectorAll(".close")
let userResults = document.getElementById("user-results")
const newBookForm = document.getElementById("new-book")
const addBookButton = document.getElementById("add-book-button")
//const keys = Object.keys(defaultLibrary)

class Book{
    constructor(id, name, author, isbn, read, imgsrc){
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

function newBookObject(name, author, isbn, read, imgsrc){
    myLibrary[booknum] = new Book(booknum, name, author, isbn, read, imgsrc)
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
let resultados
let currentTitle
let currentAuthor
let currentISBN
let currentImgsrc
let hasread
async function populateSearchModal(title, author, isbn){
    results = await bookSearch(`${title} ${author} ${isbn}`)
    resultados = results
    booksearchImg.innerHTML = `<img src=${results.items[0].volumeInfo.imageLinks.thumbnail} alt=""></img>`
    booksearchTitle.innerHTML = results.items[0].volumeInfo.title
    booksearchAuthor.innerHTML = results.items[0].volumeInfo.authors
    booksearchISBN.innerHTML = `ISBN-10: ${results.items[0].volumeInfo.industryIdentifiers[1].identifier}`
    currentTitle = results.items[0].volumeInfo.title
    currentAuthor = results.items[0].volumeInfo.authors
    currentISBN = results.items[0].volumeInfo.industryIdentifiers[1].identifier
    currentImgsrc = results.items[0].volumeInfo.imageLinks.thumbnail
}
addBookButton.addEventListener('click',async (e)=>{
    e.preventDefault()
    if(newBookForm.cbox1.checked){hasread = true}else{hasread = false}
    let title= newBookForm.title.value
    let author = newBookForm.author.value 
    let isbn = newBookForm.isbn.value
    await populateSearchModal(title, author, isbn)
    
    toggleBookModal()
    toggleBookModal(booksearchModal)
})

const confirmButton = document.getElementById("confirm")
confirmButton.addEventListener('click', (e)=>{
    newBookObject(currentTitle, currentAuthor, currentISBN, hasread, currentImgsrc )
    saveUserLibrary()



    /* function newBookObject(name, author, isbn, read, imgsrc){
    myLibrary[booknum] = new Book(name, author, isbn, read, imgsrc)
    booknum = (parseInt(booknum) +1).toString() */
    
})



getUserLibrary()

if(!localStorage.getItem("myLibrary")){
    loadLibrary(defaultLibrary)
    myLibrary = defaultLibrary
    saveUserLibrary()
}else{
    loadLibrary(myLibrary)
}
