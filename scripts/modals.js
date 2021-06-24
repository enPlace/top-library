const addbookModal = document.getElementById("add-book-modal")
const addBookButton = document.getElementById("add-book-button")
const booksearchModal = document.getElementById("book-search-modal")
const booksearchImg = document.getElementById("booksearch-img")
const booksearchTitle = document.getElementById("booksearch-title")
const booksearchAuthor = document.getElementById("booksearch-author")
const booksearchISBN = document.getElementById("booksearch-isbn")

const bookListModal = document.getElementById("book-list-modal")
const overlay = document.getElementById("overlay")
const searchAgainButton = document.getElementById("search-again")

const errorModal = document.getElementById("error-modal")
const errorModalButton = document.getElementById("error-return")

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

let resultados
let currentTitle
let currentAuthor
let currentISBN
let currentImgsrc
let hasread


addBookButton.addEventListener('click',async (e)=>{
    e.preventDefault()
    if(newBookForm.cbox1.checked){hasread = true}else{hasread = false}
    let title= newBookForm.title.value
    let author = newBookForm.author.value 
    let isbn = newBookForm.isbn.value
    try{
    await populateSearchModal(title, author, isbn)
        toggleBookModal()
        toggleBookModal(booksearchModal)
    }catch{
        
        toggleBookModal()
        toggleBookModal(errorModal)
     
    }
    
})

async function populateSearchModal(title, author, isbn){
    results = await bookSearch(`${title} ${author} ${isbn}`)
    resultados = results
    booksearchImg.innerHTML = `<img src=${results.items[0].volumeInfo.imageLinks.thumbnail} alt=""></img>`
    booksearchTitle.innerHTML = results.items[0].volumeInfo.title
    booksearchAuthor.innerHTML = results.items[0].volumeInfo.authors
    booksearchISBN.innerHTML = `ISBN: ${results.items[0].volumeInfo.industryIdentifiers[0].identifier}`
    currentTitle = results.items[0].volumeInfo.title
    currentAuthor = results.items[0].volumeInfo.authors
    currentISBN = results.items[0].volumeInfo.industryIdentifiers[0].identifier
    currentImgsrc = results.items[0].volumeInfo.imageLinks.thumbnail
}

const confirmButton = document.getElementById("confirm")
confirmButton.addEventListener('click', (e)=>{
    newBookObject(currentTitle, currentAuthor, currentISBN, hasread, currentImgsrc )
    saveUserLibrary()
})

const showAllResultsButton = document.getElementById("show-all-results-button")
showAllResultsButton.addEventListener('click', (e)=>{
    e.preventDefault()
     toggleBookModal()
     toggleBookModal(bookListModal)
     populateResultsList()
})


const bookResultsContainer = document.getElementById("book-results-container")
const listItemClick = function (e){
    console.log("working")
    console.log(e.target.dataset.target)
    let i 
    try{
        i = e.target.dataset.target
    }catch{
        i = e.target.parentElement.dataset.target
    }
    
    let title= resultados.items[i].volumeInfo.title
    let author = resultados.items[i].volumeInfo.authors
    let isbn
    if(resultados.items[i].volumeInfo.industryIdentifiers){isbn = resultados.items[i].volumeInfo.industryIdentifiers[0].identifier}
    booksearchTitle.innerHTML = title
    booksearchAuthor.innerHTML = author
    booksearchISBN.innerHTML = `ISBN: ${isbn}`
    currentTitle = title
    currentAuthor = author
    currentISBN = isbn
    try{
        booksearchImg.innerHTML = `<img src=${resultados.items[i].volumeInfo.imageLinks.thumbnail} alt=""></img>`
        currentImgsrc = resultados.items[i].volumeInfo.imageLinks.thumbnail
        //newBookObject(resultados.items[i].volumeInfo.title, resultados.items[i].volumeInfo.authors, resultados.items[i].volumeInfo.industryIdentifiers[0].identifier, hasread, resultados.items[i].volumeInfo.imageLinks.thumbnail )
    }catch{
        booksearchImg.innerHTML = `No Image Available`
        currentImgsrc = false
        //newBookObject(resultados.items[i].volumeInfo.title, resultados.items[i].volumeInfo.authors, resultados.items[i].volumeInfo.industryIdentifiers[0].identifier, hasread, imgsrc = false)
    }
    toggleBookModal()
    toggleBookModal(booksearchModal)
}
function populateResultsList(){
    removeChildren(bookResultsContainer)
    let i = 0
    resultados.items.forEach(result=>{
        const newListItemContainer = document.createElement("div")
        newListItemContainer.classList = "list-item-container"
        newListItemContainer.dataset.target = i
       
        if(result.volumeInfo.imageLinks){
        newListItemContainer.innerHTML = `<div class="list-item-title" data-target = "${i}">${result.volumeInfo.title}</div><div class="list-item-author"data-target = "${i}">${result.volumeInfo.authors}</div><div class="list-item-thumb"><img data-target = "${i}" src=${result.volumeInfo.imageLinks.smallThumbnail} alt=""></div>`
        }else{
            newListItemContainer.innerHTML = `<div class="list-item-title">${result.volumeInfo.title}</div><div class="list-item-author">${result.volumeInfo.authors}</div><div class="list-item-thumb">No image available</div>`
        }
        newListItemContainer.addEventListener('click', listItemClick)
        
        bookResultsContainer.appendChild(newListItemContainer)
        i++
    })

}

searchAgainButton.addEventListener('click', (e)=>{
    e.preventDefault()
    toggleBookModal()
    toggleBookModal(addbookModal)
})

errorModalButton.addEventListener('click', ()=>{
    toggleBookModal()
    toggleBookModal(addbookModal)
})

overlay.addEventListener('click', ()=>{
    if(overlay.classList.contains("active")){
        toggleBookModal()
    }
})