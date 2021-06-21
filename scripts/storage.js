function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    console.log("yep!")
  }
  else {
    console.log("nope!")
  }

function getUserLibrary(){
    if(localStorage.getItem("myLibrary")){
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
    }
    if(localStorage.getItem('booknum')){
        booknum = localStorage.getItem('booknum')      
    }
}

function saveUserLibrary(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    localStorage.setItem('booknum', booknum)
}

const defaultLibrary= {
    book1:{
        name: "The Philosophy of Jean-Paul Sartre",
        author: "Jean-Paul Sartre",
        read: "true",
        isbn: "1400076323",
        imgsrc: "./images/sartre.jpg"
    }, 
    book2:{
        name: "Boggs:A Comedy of Values",
        author: "Lawrence Weschler  ",
        read:"true",
        isbn: "9780226893969",
        imgsrc: "./images/weschler.jpg"
    },
    book3:{
        name: "Ficciones",
        author: "Jorge Louis Borges",
        read: "true",
        isbn: "8426405738",
        imgsrc: "./images/borges.jpg",
    }, 
    book4:{
        name: "Something Deeply Hidden: Quantum Worlds and the Emergence of Spacetime",
        author: "Sean Carroll",
        read: "false",
        isbn: "9781524743017",
        imgsrc: "./images/weschler.jpg",
    }, 
    book5:{
        name: "Gödel, Escher, Bach: An Eternal Golden Braid",
        author: "Douglas Hofstadter",
        read: "true",
        isbn: "0465026567",
        imgsrc: "./images/hofstadter.jpg",
},
    book6:{
        name: "Cracking the Coding Interview", 
        author: "Gale Laakmann McDowell",
        read: "false",
        isbn:" 0984782869",
        imgsrc: "./images/mcdowell.jpg",
    }};