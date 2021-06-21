
let myLibrary ={}
let booknum = "1"
let closeButtons = document.querySelectorAll(".close")
let userResults = document.getElementById("user-results")
const defaultLibrary= {
    book1:{
        name: "The Philosophy of Jean-Paul Sartre",
        author: "Jean-Paul Sartre",
        read: "true",
        isbn: "1400076323",
    }, 
    book2:{
        name: "Boggs:A Comedy of Values",
        author: "Lawrence Weschler  ",
        read:"true",
        isbn: "9780226893969",
    },
    book3:{
        name: "Ficciones",
        author: "Jorge Louis Borges",
        read: "true",
        isbn: "8426405738",
    }, 
    book4:{
        name: "Something Deeply Hidden: Quantum Worlds and the Emergence of Spacetime",
        author: "Sean Carrol",
        read: "false",
        isbn: "9781524743017",
    }, 
    book5:{
        name: "Gödel, Escher, Bach: An Eternal Golden Braid",
        author: "Douglas Hofstadter",
        read: "true",
        isbn: "0465026567"
},
    book6:{
        name: "Cracking the Coding Interview", 
        author: "Gale Laakmann McDowell",
        read: "false",
        isbn: "0984782850",
    }};

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
function newCard(name, author, isbn, read, imgsrc){
    let newcard = document.createElement('div')
    newcard.classList = "user-card"
    newcard.innerHTML = `<div class="close"><button>&times;</button></div><img src="images.jpg" class="avatar"> <div class="top info">${name} </div><div class="bottom info">${author} </div>`
    userResults.appendChild(newcard)

    
}


const deleteCard = function(e){
    console.log(e.target.parentNode.parentNode.parentNode)
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
}

closeButtons.forEach(button =>{
    button.addEventListener('click', deleteCard)
})