const {nanoid} = require('nanoid');
const books = require('./books');
const {apiResponse, bookDto} = require('./helper');

const getBooks = (request, h) => {
  const {name, reading, finished} = request.query;
  let listData;
  if (reading === '1') {
    listData = books.filter((i) => i.reading === '1').map((j) => bookDto(j));
  } else if (reading === '0') {
    listData = books.filter((i) => i.reading !== '1').map((j) => bookDto(j));
  } else if (finished === '0') {
    listData = books.filter((i) => i.finished === false).map((j) => bookDto(j));
  } else if (finished === '1') {
    listData = books.filter((i) => i.finished === '1').map((j) => bookDto(j));
  } else if (name) {
    listData = books.filter((i) => i.name.toLowerCase().includes(name.toLowerCase())).map((j) => bookDto(j));
  } else if (name === undefined) {
    listData = books.map((i) => bookDto(i));
  }
  return apiResponse(h, 200, 'success', null, {books: listData});
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