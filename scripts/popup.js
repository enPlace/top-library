const addbookModal = document.getElementById("add-book-modal")
const booksearchModal = document.getElementById("book-search-modal")
const booksearchImg = document.getElementById("booksearch-img")
const booksearchTitle = document.getElementById("booksearch-title")
const booksearchAuthor = document.getElementById("booksearch-author")
const booksearchISBN = document.getElementById("booksearch-isbn")

const bookListModal = document.getElementById("book-list-modal")
const overlay = document.getElementById("overlay")

function toggleBookModal(modal){
    if(overlay.classList.contains("active")){
        current = document.getElementById(overlay.dataset.target)
        current.classList.remove("active")
        overlay.classList.remove("active")
        overlay.dataset.target = ""
        
        
    }else{
        modal.classList.add("active")
        overlay.classList.add("active")
        overlay.dataset.target = modal.id
    }
}

const bookResultsContainer = document.getElementById("book-results-container")
function populateResultsList(){
    removeChildren(bookResultsContainer)
    let i = 0
    resultados.items.forEach(result=>{
        const newListItemContainer = document.createElement("div")
        newListItemContainer.classList = "list-item-container"
        newListItemContainer.dataset.target = i
        if(result.volumeInfo.imageLinks){
        newListItemContainer.innerHTML = `<div class="list-item-title">${result.volumeInfo.title}</div><div class="list-item-author">${result.volumeInfo.authors}</div><div class="list-item-thumb"><img src=${result.volumeInfo.imageLinks.smallThumbnail} alt=""></div>`
        }else{
            newListItemContainer.innerHTML = `<div class="list-item-title">${result.volumeInfo.title}</div><div class="list-item-author">${result.volumeInfo.authors}</div><div class="list-item-thumb">No image available</div>`
        }
        newListItemContainer.addEventListener('click', (e)=>{
            console.log("working")
            console.log(e.target.dataset.target)
            i = e.target.dataset.target
            try{
                newBookObject(resultados.items[i].volumeInfo.title, resultados.items[i].volumeInfo.authors, resultados.items[i].volumeInfo.industryIdentifiers[0].identifier, hasread, resultados.items[i].volumeInfo.imageLinks.thumbnail )
            }catch{
                newBookObject(resultados.items[i].volumeInfo.title, resultados.items[i].volumeInfo.authors, resultados.items[i].volumeInfo.industryIdentifiers[0].identifier, hasread, imgsrc = false)
            }
            saveUserLibrary()
            

            /* if(resultados.items[i].volumeInfo.imageLinks){
                myLibrary[booknum].imgsrc = resultados.items[0].volumeInfo.imageLinks.thumbnail
            } */
            /* function newBookObject(name, author, isbn, read, imgsrc){
                myLibrary[booknum] = new Book(booknum, name, author, isbn, read, imgsrc)
                booknum = (parseInt(booknum) +1).toString()
            } */

        })
        bookResultsContainer.appendChild(newListItemContainer)
        i++
    })

}

overlay.addEventListener('click', ()=>{
    if(overlay.classList.contains("active")){
        toggleBookModal()
    }
})