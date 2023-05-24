const {nanoid} = require('nanoid');
const books = require('./books');
const apiResponse = require('./helper');

const getBooks = (request, h) => {
  // let data = books;
  return h.response({
    status: 'success',
    data: {
      'books': books,
    },
  });
};


const addBook = (request, h) => {
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const newBook = {id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt};
  if (newBook.name === undefined) {
    return apiResponse(h, 400, 'fail', 'Gagal menambahkan buku. Mohon isi nama buku', null);
  } else if (newBook.pageCount < newBook.readPage) {
    return apiResponse(h, 400, 'fail', 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', null);
  } else {
    books.push(newBook);
    return apiResponse(h, 201, 'success', 'Buku berhasil ditambahkan', {bookId: id});
  }
};

module.exports = {getBooks, addBook};