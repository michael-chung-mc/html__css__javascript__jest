function viewForm () {
    document.getElementById("toggle-form").style.display = "grid";
}

let library = [];

// function book (id, title, pages, author){
//     this.id = id
//     this.title = title
//     this.pages = pages
//     this.author = author
//     this.read = false

//     this.info = function() {
//         statusMessage = this.title + " by " + this.author + ", " + this.pages + " pages, ";
//         // console.log(statusMessage);
//         if (this.read) {
//             statusMessage += "has been read";
//         }
//         else {
//             statusMessage += "not read yet"
//         }
//         return statusMessage;
//     }

//     this.Explore = function() {
//         this.read = true;
//     }
// }

class book {
    constructor (id, title, pages, author) {
        this.id = id
        this.title = title
        this.pages = pages
        this.author = author
        this.read = false
    }
    info() {
        statusMessage = this.title + " by " + this.author + ", " + this.pages + " pages, ";
        // console.log(statusMessage);
        if (this.read) {
            statusMessage += "has been read";
        }
        else {
            statusMessage += "not read yet"
        }
        return statusMessage;
    }

    explore() {
        this.read = true;
    }
}

function addBookToLibrary (book) {
    library.push(book);
    // console.log("added")
    // console.log(book.info());
}

function removeBookFromLibrary (bookId) {
    let newLibrary = [];
    for (let i = 0; i < library.length; i++) {
        if (String(i) != String(bookId)) {
            newLibrary.push(library[i]);
        }
    }
    library = newLibrary;
}

function testLibrary () {
    for (let i = 0; i < library.length; i += 1)
    {
        console.log(library[i].info());
    }
}

// addBookToLibrary (new book("Test", 111111111, "Test"));
// addBookToLibrary (new book("Test1", 2, "Test1"));
// addBookToLibrary (new book("Test2", 333, "Test2"));
// addBookToLibrary (new book("Test3", 4444, "Test3"));
// addBookToLibrary (new book("Test4", 555555, "Test4"));

// testLibrary();

function getIdDiv (bookId) {
    var div = document.createElement("id");
    div.innerHTML = bookId;
    return div;
}

function getTitleDiv (title) {
    var div = document.createElement("div");
    div.innerHTML = title;
    return div;
}
function getPageseDiv (pages) {
    var div = document.createElement("div");
    div.innerHTML = pages;
    return div;
}
function getAuthorDiv (author) {
    var div = document.createElement("div");
    div.innerHTML = author;
    return div;
}
function getReadDiv (read) {
    var div = document.createElement("div");
    if (read) {
        div.innerHTML = "Read";
    }
    else {
        div.innerHTML = "Not Read";
    }
    return div;
}

function clearLibraryDisplay () {
    let oldLibrary = document.getElementById("library-container");
    while (oldLibrary.firstChild)
    {
        oldLibrary.removeChild(oldLibrary.firstChild)
    }
}

function clearLibrary () {
    library = [];
    clearLibraryDisplay();
}

// function displayLibrary () {
//     let libraryContainer = document.getElementById("library-container");
//     let existingBooks = libraryContainer.childNodes;
//     let newAdditionSize = library.length - existingBooks.length;
//     if (newAdditionSize > 0) {
//         for (let i = library.length -1; i > existingBooks.length - 1; i--) {
//             // add book div
//             var bookCard = document.createElement("div");
//             bookCard.appendChild(getTitleDiv(library[i].title));
//             bookCard.appendChild(getPageseDiv(library[i].pages));
//             bookCard.appendChild(getAuthorDiv(library[i].author));
//             bookCard.appendChild(getReadDiv(library[i].read));
//             bookCard.classList.add("book-card");
//             bookCard.setAttribute("id", library[i].id);
//             // add ability to remove book
//             var removeButton = document.createElement("button");
//             removeButton.setAttribute("type", "submit");
//             removeButton.setAttribute("class", "remove-button-submit");
//             removeButton.innerHTML = "Remove Book";
//             removeButton.addEventListener("submit", function (event) {
//                 event.preventDefault();
//                 console.log("removing ...");
//                 const bookCards = document.getElementsByClassName("book-card");
//                 for (let j = 0; j < bookCards.length; j++) {
//                     console.log("for "+i);
//                     bookCards[j].getAttribute("id");
//                     if (bookCards[j].getAttribute("id") == String(library[i].id))
//                     {
//                         console.log("checking"+i);
//                         library[i].info();
//                         removeBookFromLibrary(library[i].id);
//                     }
//                 }
//             })
//             bookCard.appendChild(removeButton);
//         }
//     }
// }

function removeBook (id) {
    return function () {
        console.log("removing book: " + id);
        removeBookFromLibrary(id);
        clearLibraryDisplay();
        displayLibrary();
        // const bookCards = document.getElementsByClassName("book-card");
        // for (let i = 0; i < bookCards.length; i++) {
        //     if (bookCards[i].getAttribute("id") == id)
        //     {
        //         removeBookFromLibrary(id);
        //     }
        // }
    }
}

function readBook (id) {
    return function () {
        console.log("reading book: " + id);
        library[id].read = !library[id].read;
        clearLibraryDisplay();
        displayLibrary();
    }
}

function displayLibrary () {
    let libraryContainer = document.getElementById("library-container");
    for (let i = 0; i < library.length; i++) {
        //update id if removed or altered library
        let newId = i;
        library[i].id = newId;
        // add book div
        var bookCard = document.createElement("div");
        bookCard.appendChild(getTitleDiv(library[i].title));
        bookCard.appendChild(getPageseDiv(library[i].pages));
        bookCard.appendChild(getAuthorDiv(library[i].author));
        bookCard.appendChild(getReadDiv(library[i].read));
        bookCard.classList.add("book-card");
        bookCard.setAttribute("id", newId);
        // add ability to remove book
        var removeButton = document.createElement("button");
        removeButton.setAttribute("type", "submit");
        removeButton.setAttribute("class", "remove-button-submit");
        removeButton.innerHTML = "Remove Book";
        removeButton.addEventListener("click", removeBook(newId), false);
        // removeButton.addEventListener("click", function (event) {
        //     event.preventDefault();
        //     removeBook(newId);
        //     event.preventDefault();
        //     console.log("removing ...");
        //     const bookCards = document.getElementsByClassName("book-card");
        //     for (let j = 0; j < bookCards.length; j++) {
        //         console.log("for "+i);
        //         console.log(bookCards[j].getAttribute("id"));
        //         if (bookCards[j].getAttribute("id") == String(library[i].id))
        //         {
        //             console.log("checking"+i);
        //             library[i].info();
        //             removeBookFromLibrary(library[i].id);
        //         }
        //     }
        // })
        bookCard.appendChild(removeButton);
        // add ability to toggle read
        var readButton = document.createElement("button");
        readButton.setAttribute("type", "submit");
        readButton.setAttribute("class", "read-button-submit");
        readButton.innerHTML = "Read Book";
        readButton.addEventListener("click", readBook(newId), false);
        // readButton.addEventListener("submit", function (event) {
        //     event.preventDefault();
        //     console.log("hello");
        //     readBook(newId);
        // })
        bookCard.appendChild(readButton);
        // add to library container to view book card
        libraryContainer.appendChild(bookCard);
    }
}

document.getElementById("toggle-form", addEventListener("submit", function(event){
    event.preventDefault();
    const form = document.getElementById("toggle-form");
    let title = document.getElementById("book-title-text").value;
    let pages = document.getElementById("book-pages-text").value;
    let author = document.getElementById("book-author-text").value;
    if (title == "")
    {
        this.alert("Title is empty");
    }
    else if (pages == "")
    {
        this.alert("Pages is empty");
    }
    else if (author == "")
    {
        this.alert("AUthor is empty");
    }
    else
    {
        addBookToLibrary (new book(library.length + 1, title, pages, author));
        clearLibraryDisplay();
        displayLibrary();
        testLibrary();
    }
}));