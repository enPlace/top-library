let resultadoss
async function getSample(){
    url = "./result-sample.json"
    const response = await fetch(url)
    const data = await response.json()
    resultadoss = data
}

getSample()


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

        })
        bookResultsContainer.appendChild(newListItemContainer)
        i++
    })

}
function removeChildren(parent){
    //removes all children of an element
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    };
}
