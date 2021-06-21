# top-library

I'll have the form, which creates the object. The object will be put into an array that has a key. 
for instance: 
{key1: {object1}, key2, {object2}}

the object will have the following properties: 

    book1:{
        name: "Harry Potter",
        author: "JK Rowling",
        read: "true",
        isbn: "kcnkdlimce",
        dateCreated: datetime string
    }, 

now when I add a book, what do I want to do? 

I want to send the search to google books api, then upon the response, pop up another modal that asks "is this your book?"

if yes, a new book is created, if no, the next book in the volume collection is shown, and a button that says "continue without using search data" or something 

When the user clicks yes, the data from the api response automatically makes a new book object and populates the page 

