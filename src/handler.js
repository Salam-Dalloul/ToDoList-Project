const fs = require('fs');
const signup = require('./database/queries/signup');
const querystring = require('querystring');


const handleHomePages = (request, response) => {
  fs.readFile(`${__dirname}/../public/index.html`, (error, file) => {
    if (error) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
      console.log(error);
    } else {
      response.writeHead(200, { 'content-type': 'text/html' });
      response.end(file);
    }
  });
};

const handleSignUp = (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    const name = querystring.parse(data).name;
    const email = querystring.parse(data).email;
    const hashPassword = querystring.parse(data).hashPassword;
    signup(name, email, hashPassword, (err, res) => {
      if (err) {
        response.writeHead(500, 'Content-Type:text/html');
        response.end('<h1>Sorry, there was a problem adding that user</h1>');
      } else {
        response.writeHead(200, 'content-type: text/plain');
        response.end('done');
      }
    });
  });
};

const handleGeneric = (request, response) => {
  const fileName = request.url;
  const fileType = request.url.split('.')[1];
  fs.readFile(`${__dirname}/../public${fileName}`, (error, file) => {
    if (error) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem loading this page</h1>');
      console.log(error);
    } else {
      response.writeHead(200, {
        'Content-Type': `text/${fileType}`,
      });
      response.end(file);
    }
  });
};


module.exports = {
  handleGeneric,
  handleHomePages,
  handleSignUp,

};
