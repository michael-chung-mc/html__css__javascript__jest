let myLibrary = [];

function book (title, pages, author){
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
    myLibrary.push(book);
    // console.log(book.info());
}

function exploreLibrary () {
    for (let i = 0; i < myLibrary.length - 1; i += 1)
    {
        console.log(myLibrary[i].info());
    }
}

addBookToLibrary (new book("Test", 111111111, "Test"));
addBookToLibrary (new book("Test1", 2, "Test1"));
addBookToLibrary (new book("Test2", 333, "Test2"));
addBookToLibrary (new book("Test3", 4444, "Test3"));
addBookToLibrary (new book("Test4", 555555, "Test4"));

exploreLibrary();