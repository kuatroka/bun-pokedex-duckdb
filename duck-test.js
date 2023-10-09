import duckdb from 'duckdb';

const db = new duckdb.Database(':memory:');

db.all('SELECT 42 as fortytwo', console.log);
db.close();