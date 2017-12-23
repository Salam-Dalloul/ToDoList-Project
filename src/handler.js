const fs = require('fs');
const signup = require('./database/queries/signup');
const login = require('./database/queries/login');
const querystring = require('querystring');
const bcrypt = require('bcryptjs');

const handleHomePages = (request, response) => {
  fs.readFile(`${__dirname}/../public/index.html`, (error, file) => {
    if (error) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
      console.log(error);
    } else {
      response.writeHead(200, {
        'content-type': 'text/html',
      });
      response.end(file);
    }
  });
};

const handleSignUp = (request, response) => {
  fs.readFile(`${__dirname}/../public/signup.html`, (err, data) => {
    if (err) {
      response.writeHead(302, {
        Location: '/404',
      });
      response.end();
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html',
      });
      response.end(data);
    }
  });
};

const handleToDoPage = (request, response) => {
  fs.readFile(`${__dirname}/../public/home.html`, (err, data) => {
    if (err) {
      response.writeHead(302, {
        Location: '/404',
      });
      response.end();
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html',
      });
      response.end(data);
    }
  });
};

const handleLogIn = (request, response) => {
  let content = '';
  request.on('data', (chunk) => {
    content += chunk;
  });
  request.on('end', () => {
    const data = querystring.parse(content);
    bcrypt.hash(data.password, 10, (err, hashedPassword) => {
      if (err) {
        response.writeHead(302, { Location: '/' });
        response.end();
      } else {
        login((err1, result) => {
          if (err1) {
            response.writeHead(302, { Location: '/' });
            response.end();
          } else {
            bcrypt.compare(result.password, hashedPassword, (err2, res) => {
              if (err2) {
                response.writeHead(302, { Location: '/' });
                response.end();
              } else if (res) {
                const payload = {
                  id: result.id,
                  name: result.name,
                };
                const token = jwt.sign(payload, 'shhhh');
                res.writeHead(302, { 'Set-Cookie': `token = ${token}`, Location: '/todo' });
                res.end();
              }
            });
          }
        });
      }
    });
  });
};
const handleaddNewUser = (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    const name = querystring.parse(data).name;
    const email = querystring.parse(data).email;
    const password = querystring.parse(data).password;
    const hashPassword = (passwordh, callback) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          callback(null, hash);
        });
      });
    };
    hashPassword(password, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        signup(name, email, result, (error, res) => {
          if (error) {
            response.writeHead(500, 'Content-Type:text/html');
            response.end('<h1>Sorry, there was a problem adding that user</h1>');
          } else {
            response.writeHead(302, {
              Location: '/',
            });
            response.end();
          }
        });
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
  handleaddNewUser,
  handleLogIn,
  handleToDoPage,
};
