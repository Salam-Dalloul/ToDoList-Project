const dbConnection = require('../dbconnection');

const signup = (name, email, password, cb) => {
  const sql = {
    text: 'insert into users (name, email, password) values ($1, $2, $3);',
    values: [name, email, password],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, true);
  });
};

module.exports = signup;
