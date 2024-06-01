const { Pool } = require('pg');

const PG_URI = 'postgres://zgxbojwh:9bawbjYfsPtd1fC-czO311iR7chA80T6@kala.db.elephantsql.com/zgxbojwh';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};