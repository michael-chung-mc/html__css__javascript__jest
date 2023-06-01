let library = [];

function book (id, title, pages, author){
    this.id = id
    this.title = title
    this.pages = pages
    this.author = author
    this.read = false

    this.info = function() {
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

    this.Explore = function() {
        this.read = true;
    }
}

function addBookToLibrary (book) {
    library.push(book);
    // console.log(book.info());
}

function testLibrary () {
    for (let i = 0; i < library.length - 1; i += 1)
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

function displayLibrary () {
    let libraryContainer = document.getElementById("library_container");
    let existingBooks = libraryContainer.childNodes;
    let newAdditionSize = library.length - existingBooks.length;
    if (newAdditionSize > 0) {
        for (let i = library.length -1; i > existingBooks.length - 1; i--) {
            // add book div
            var book = document.createElement("div");
            book.appendChild(getIdDiv(library[i].id));
            book.appendChild(getTitleDiv(library[i].title));
            book.appendChild(getPageseDiv(library[i].pages));
            book.appendChild(getAuthorDiv(library[i].author));
            book.appendChild(getReadDiv(library[i].read));
            book.classList.add("book_card");
            // add ability to remove book
            let removeButton = document.createElement("input");
            removeButton.setAttribute("type", "submit");
            removeButton.setAttribute("id", "remove_button_submit");
            removeButton.setAttribute("value", "Remove Book");
            book.appendChild(removeButton);
            document.getElementById("library_container").appendChild(book);
        }
    }
}

function clearLibrary () {
    library = [];
    let oldLibrary = document.getElementById("library_container");
    while (oldLibrary.firstChild)
    {
        oldLibrary.removeChild(oldLibrary.firstChild)
    }
}

function clearLibraryDisplay () {
    let oldLibrary = document.getElementById("library_container");
    while (oldLibrary.firstChild)
    {
        oldLibrary.removeChild(oldLibrary.firstChild)
    }
}

// displayLibrary();

function viewForm () {
    document.getElementById("toggle_form").style.display = "grid";
}

document.addEventListener("submit", function(event){
    event.preventDefault();
    var form = document.getElementById("toggle_form");
    let title = form.new_book_title_text.value;
    let pages = form.new_book_pages_text.value;
    let author = form.new_book_author_text.value;
    addBookToLibrary (new book(library.length. title, pages, author));
    clearLibraryDisplay;
    displayLibrary();
    testLibrary();
})