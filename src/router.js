const handlers = require('./handler');

const router = (request, response) => {
  const endpoint = request.url.split('/')[1];
  if (endpoint === '') {
    handlers.handleHomePages(request, response);
  } else if (endpoint === 'signup') {
    handlers.handleSignUp(request, response);
  } else {
    handlers.handleGeneric(request, response);
  }
};

module.exports = router;
