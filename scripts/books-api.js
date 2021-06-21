//for using the google books api

const bookSearch = async function(searchText){
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
    const response = await fetch(url)
    if(!response.ok){
        throw Error(response.status)
    }
    const data = await response.json()

    return data

}