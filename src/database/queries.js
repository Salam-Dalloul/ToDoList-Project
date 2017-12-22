const dbconnection = require('./dbconnection');

const insertData = (title, author, cb) => {
  const sql = {
    text: 'insert into books (title, author) values ($1, $2); ',
    values: [title, author],
  };

  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, true);
  });
};

module.exports = insertData;
