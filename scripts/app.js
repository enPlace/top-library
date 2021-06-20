class Book{
    constructor(name, author, pages, read=false){
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
    this.dateAdded = new Date()

    }
}

Book.prototype.print= function(){
    console.log(
        this.name, this.pages, this.read
    )
}
Book.prototype.changeStatus = function(){
    this.read = true
}
const Harry = new Book("harry potter", 300)


let myLibrary = {
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


