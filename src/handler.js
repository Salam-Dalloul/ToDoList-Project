const fs = require('fs');
const signup = require('./database/queries/signup');
const querystring = require('querystring');
const bcrypt = require('bcryptjs');

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
  fs.readFile(`${__dirname}/../public/signup.html`, (err, data) => {
    if (err) {
      response.writeHead(302, {'Location': '/404'});
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
    }
  });
};


const handleaddNewUser = (request, response) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    const xx = querystring.parse(data);
    console.log('gggggg', xx);
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
   hashPassword(password,(err, result)=>{
      if(err) {
        console.log(err);
      }else{
        signup(name, email, result, (error, res) => {
          if (error) {
            response.writeHead(500, 'Content-Type:text/html');
            response.end('<h1>Sorry, there was a problem adding that user</h1>');
          } else {
            console.log(res);
            response.writeHead(200, 'content-type: text/plain');
            response.end('done');
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
  handleaddNewUser

};
