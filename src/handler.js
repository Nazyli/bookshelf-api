const {nanoid} = require('nanoid');
const books = require('./books');

const getBooks = (request, h) => {
  let data = books;
  data = [
    {
      'id': nanoid(16),
      'name': 'Evry Nazyli',
      'publisher': 'Evry Nazyli',
    },
  ];
  return h.response({
    status: 'success',
    data: {
      'books': data,
    },
  });
};

module.exports = getBooks;