const sortDropdown = document.getElementById("sort-select")

sortDropdown.addEventListener('click', (e)=>{
    console.log(e.target.value)
    if(e.target.value == "a-z"){
        azSort()

    }else if(e.target.value == "z-a"){
        zaSort()
        
    }else if(e.target.value == "newest"){
        newSort()
        
    }else if(e.target.value == "oldest"){
        oldSort()
        
    }
})

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
    return myLibrary
}
function oldSort(){
    myLibrary.sort((a,b)=>{
        return (a.dateAdded>b.dateAdded)?1:-1
    })
    saveUserLibrary()
    return myLibrary
}
function newSort(){
    myLibrary.sort((a,b)=>{
        return (a.dateAdded<b.dateAdded)?1:-1
    })
    saveUserLibrary()
    return myLibrary
}
