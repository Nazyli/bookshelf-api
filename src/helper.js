const apiResponse = (h, code, status, message, data) => {
  const response = h.response({
    ...(status && {status: status}),
    ...(message && {message: message}),
    ...(data && {data: data}),
  });
  response.code(code);
  return response;
};

const bookDto = (book) =>{
  return {
    'id': book.id,
    'name': book.name,
    'publisher': book.publisher,
  };
};

module.exports = {apiResponse, bookDto};
