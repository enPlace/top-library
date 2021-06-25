
let myLibrary ={}
let booknum = "1"
let closeButtons = document.querySelectorAll(".close")
let userResults = document.getElementById("user-results")
const newBookForm = document.getElementById("new-book")

const addCard = document.getElementById("add-card")
const formTitle = document.getElementById("title")
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
    myLibrary.unshift(new Book(booknum, name, author, isbn, read, imgsrc))
    booknum = (parseInt(booknum) +1).toString()
}
function newCard(book){
    let newCard = document.createElement('div')
    newCard.classList = "user-card"
    newCard.innerHTML = `<img src="${book.imgsrc}" class="avatar">` 
    
    
    let newContent = document.createElement('div')
    newContent.classList = "card-content"
    newContent.innerHTML = `<div class="close">
    <button>&times;</button>
    </div>
    <div class="top-info">${book.name}</div>
    <div class="bottom-info">${book.author}</div>
    <div class="isbn">ISBN: ${book.isbn}</div>
    <br><br>`

    let hasReadToggle = document.createElement('div')
    hasReadToggle.classList = "has-read"
    hasReadToggle.dataset.bookid = book.id
    if(book.read){
        hasReadToggle.innerHTML = `<div>Read</div>
        <label class="switch">
            <input data-bookid = "${book.id}" type="checkbox" checked>
            <span class="slider round"></span>
          </label>`
    }else{
        hasReadToggle.innerHTML = `<div>Not read</div>
        <label class="switch">
            <input data-bookid = ${book.id} type="checkbox">
            <span class="slider round"></span>
          </label>`
    }
    hasReadToggle.addEventListener('change', changeReadStatus)
    
    newContent.appendChild(hasReadToggle)
    newCard.appendChild(newContent)
    userResults.appendChild(newCard)    
    newCard.id = book.id
    const closeButton = newContent.querySelectorAll(".close")[0]
    closeButton.addEventListener('click', deleteCard)
}

const changeReadStatus = function(e){   
    myLibrary.some(book=>{
        if(book.id==e.target.dataset.bookid){
            if(book.read){
                book.read = false
                e.target.parentNode.parentNode.firstChild.textContent = "Not Read"
                saveUserLibrary()
            }else{
                book.read =true
                e.target.parentNode.parentNode.firstChild.textContent = "Read"
                saveUserLibrary()
            }            
        }
        return book.id ==e.target.dataset.bookid
    })
}
let card = false
const deleteCard = function(e){
    if(!card){
        card = e.target.parentNode.parentNode.parentNode
        toggleBookModal(deleteModal)
    }else{
        for(let i = 0; i<myLibrary.length; i++){
            if(myLibrary[i].id == card.id){
            myLibrary.splice(i,1)
            }
        }
        saveUserLibrary()
        card.parentNode.removeChild(card)
        card = false
    }
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
function removeChildren(parent){
    //removes all children of an element
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    };
}


//any time the window loads
getUserLibrary()
function cleanLibrary(library){
    //sometimes a null value is added if the api doesn't load correctly. This removes any 
    //null values. 
    for (let i = 0; i<library.length; i++){
        if (!library[i])
        library.splice(i,1)
    }
}

if(!localStorage.getItem("myLibrary")){
    loadLibrary(defaultLibrary)
    myLibrary = defaultLibrary
    saveUserLibrary()
}else{
    cleanLibrary(myLibrary)
    loadLibrary(myLibrary)
}
