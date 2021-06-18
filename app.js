class Book{
    constructor(name, pages, read=false){
    this.name = name
    this.pages = pages
    this.read = read
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
