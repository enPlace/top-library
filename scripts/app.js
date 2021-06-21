
let myLibrary ={}
let booknum = "1"
let closeButtons = document.querySelectorAll(".close")
let userResults = document.getElementById("user-results")
const keys = Object.keys(defaultLibrary)

class Book{
    constructor(name, author, isbn=false, read=false, imgsrc){
    this.name = name
    this.author = author
    this.isbn = isbn
    this.read = read
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
}


const deleteCard = function(e){
    console.log(e.target.parentNode.parentNode.parentNode)
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
}



keys.forEach(book=>{
    newCard(defaultLibrary[book])
    })
closeButtons = document.querySelectorAll(".close")
    closeButtons.forEach(button =>{
        button.addEventListener('click', deleteCard)
    })