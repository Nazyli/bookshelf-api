const {getBooks, addBook} = require('./handler');
const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
];
module.exports = routes;