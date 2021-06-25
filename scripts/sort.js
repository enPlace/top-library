

const sortDropdown = document.getElementById("sort-select")
const searchbar = document.getElementById("search-bar")
sortDropdown.addEventListener('click', (e)=>{
    console.log(e.target.value)
    if(e.target.value == "a-z"){
        cleanLibrary(myLibrary)
        azSort()
    }else if(e.target.value == "z-a"){
        cleanLibrary(myLibrary)
        zaSort()
        
    }else if(e.target.value == "newest"){
        cleanLibrary(myLibrary)
        newSort()
        
    }else if(e.target.value == "oldest"){
        cleanLibrary(myLibrary)
        oldSort()
    }
    removeChildren(userResults)
    createAddCard()
    loadLibrary(myLibrary)
    
})
function createAddCard(){
    let newAddCard = document.createElement("div")
    newAddCard.classList = "user-card add-card"
    newAddCard.id = "add-card"
    newAddCard.innerHTML = '<div class = "plus">+</div>'
    newAddCard.addEventListener('click', ()=>{toggleBookModal(addbookModal)})
    userResults.appendChild(newAddCard)
}

//sort a-z
const  azSort= function(){
    myLibrary.sort((a,b)=>{
        return (a.name>b.name)?1:-1
    })
    saveUserLibrary()
    return myLibrary
}

function zaSort(){
    myLibrary.sort((a,b)=>{
        return (a.name<b.name)?1:-1
    })
    saveUserLibrary()
    
}
function oldSort(){
    myLibrary.sort((a,b)=>{
        return (a.dateAdded>b.dateAdded)?1:-1
    })
    saveUserLibrary()
    
}
function newSort(){
    myLibrary.sort((a,b)=>{
        return (a.dateAdded<b.dateAdded)?1:-1
    })
    saveUserLibrary()
}


//filter books by search parameters

searchbar.addEventListener('input', (e)=>{
    const regex = new RegExp(`${searchbar.value}`, 'i')
    //1. Find matches and put them in a new library
    let searchResults = matches = myLibrary.filter(book=>{
        return book.name.match(regex)||book.author[0].match(regex)
    })
    removeChildren(userResults)
    createAddCard()
    loadLibrary(searchResults)
})