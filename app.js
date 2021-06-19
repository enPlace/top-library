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


let myLibrary = [];


