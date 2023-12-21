'use strict'
console.log('loaded')

const booksUrl = 'http://localhost:3000/api/books'

//parsisiusti knygas
async function getBooks() {
    try {
        const resp = await fetch(booksUrl);
        console.log(resp);
        const booksData = await resp.json();
        console.log(booksData);
    } catch (error) {
        console.warn(error);
    }

}
getBooks();

