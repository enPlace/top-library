
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
    for(let i = 0; i<myLibrary.length; i++){
        if(myLibrary[i].id == card.id){
            myLibrary.splice(i,1)
        }
    }
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
