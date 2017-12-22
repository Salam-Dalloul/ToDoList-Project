const fs = require('fs');
const dbconnection = require('./dbconnection');

const sql = fs.readFileSync(`${__dirname}/build.sql`).toString();

dbconnection.query(sql, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`response is ${res}`);
  }
});
