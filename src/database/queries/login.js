const dbConnection = require('../dbconnection');

const login = (cb) => {
  const sql = 'select * from users ;';

  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, true);
  });
};

module.exports = login;
