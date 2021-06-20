
let myLibrary ={}
let booknum = "1"
let closeButtons = document.querySelectorAll(".close")
let userResults = document.getElementById("user-results")
const defaultLibrary= {
    book1:{
        name: "Harry Potter",
        author: "JK Rowling",
        read: "true",
        isbn: "kcnkdlimce",
    }, 
    book2:{
        name: "Where's Waldo",
        author: "unknown",
        read:"false",
        isbn: "ldmice",
    },
    book3:{
        name: "The Stranger",
        author: "albert camus",
        read: "true",
        isbn: "kcmiekd",
    }};

class Book{
    constructor(name, author, isbn=false, read=false){
    this.name = name
    this.author = author
    this.isbn = isbn
    this.read = read
    this.dateAdded = new Date()
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
function newCard(){
    let newcard = document.createElement('div')
    newcard.classList = "user-card"
    newcard.innerHTML = '<div class="close"><button>&times;</button></div><img src="images.jpg" class="avatar"> <div class="top info">FirstName </div><div class="bottom info">LastName </div>'
    userResults.appendChild(newcard)

    
}


const deleteCard = function(e){
    console.log(e.target.parentNode.parentNode.parentNode)
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
}

closeButtons.forEach(button =>{
    button.addEventListener('click', deleteCard)
})