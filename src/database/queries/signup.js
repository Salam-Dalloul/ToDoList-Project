const dbConnection = require('../dbconnection');

const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      callback(null, hash);
    });
  });
};

const signup = (name, email, hashPassword, cb) => {
  const sql = {
    text: 'insert into users (name, email, hashPasswor) values ($1, $2, $3);',
    values: [name, email, hashPassword],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, true);
  });
};

module.exports = signup;
