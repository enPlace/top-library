const addbookModal = document.getElementById("add-book-modal")
const booksearchModal = document.getElementById("book-search-modal")
const booksearchImg = document.getElementById("booksearch-img")
const booksearchTitle = document.getElementById("booksearch-title")
const booksearchAuthor = document.getElementById("booksearch-author")
const booksearchISBN = document.getElementById("booksearch-isbn")
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

overlay.addEventListener('click', ()=>{
    if(overlay.classList.contains("active")){
        toggleBookModal()
    }
})