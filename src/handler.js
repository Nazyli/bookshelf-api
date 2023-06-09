const {nanoid} = require('nanoid');
const books = require('./books');
const {apiResponse, bookDto} = require('./helper');

const getBooks = (request, h) => {
  const {name, reading, finished} = request.query;
  let listData;
  if (reading === '1' || reading === '0') {
    listData = books.filter((i) => i.reading === (reading === '1')).map((j) => bookDto(j));
  } else if (finished === '1' || finished === '0') {
    listData = books.filter((i) => i.finished === (finished === '1')).map((j) => bookDto(j));
  } else if (name) {
    listData = books.filter((i) => i.name.toLowerCase().includes(name.toLowerCase())).map((j) => bookDto(j));
  } else if (name === undefined) {
    listData = books.map((i) => bookDto(i));
  }
  return apiResponse(h, 200, 'success', null, {books: listData});
};
const getBookById = (request, h) => {
  const {id} = request.params;
  const book = books.filter((i) => i.id === id)[0];
  if (book === undefined) {
    return apiResponse(h, 404, 'fail', 'Buku tidak ditemukan', null);
  }
  return apiResponse(h, 200, 'success', null, {book});
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

const updateBook = (request, h) => {
  const {id} = request.params;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((i) => i.id === id);
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  if (index < 0) {
    return apiResponse(h, 404, 'fail', 'Gagal memperbarui buku. Id tidak ditemukan', null);
  }
  if ((name === undefined) || (name === '') || !name) {
    return apiResponse(h, 400, 'fail', 'Gagal memperbarui buku. Mohon isi nama buku', null);
  }
  if (readPage > pageCount) {
    return apiResponse(h, 400, 'fail', 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', null);
  }
  books[index] = {...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt};
  return apiResponse(h, 200, 'success', 'Buku berhasil diperbarui', null);
};

const deleteBook = (request, h) => {
  const {id} = request.params;
  const index = books.findIndex((book) => book.id === id);
  if (index < 0) {
    return apiResponse(h, 404, 'fail', 'Buku gagal dihapus. Id tidak ditemukan', null);
  }
  books.splice(index, 1);
  return apiResponse(h, 200, 'success', 'Buku berhasil dihapus', null);
};

module.exports = {getBooks, getBookById, addBook, updateBook, deleteBook};