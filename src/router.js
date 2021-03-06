const handlers = require('./handler');

const router = (request, response) => {
  const endpoint = request.url.split('/')[1];
  if (endpoint === '') {
    handlers.handleHomePages(request, response);
  } else if (endpoint === 'sign-up') {
    handlers.handleSignUp(request, response);
  } else if (endpoint === 'signup' && request.method === 'POST') {
    handlers.handleaddNewUser(request, response);
  } else if (endpoint === 'login' && request.method === 'GET') {
    handlers.handleLogIn(request, response);
  } else if (endpoint === 'todo') {
    handlers.handleToDoPage(request, response);
  } else {
    handlers.handleGeneric(request, response);
  }
};

module.exports = router;
