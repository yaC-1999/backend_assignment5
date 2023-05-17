const express = require("express");
var mysql = require("mysql2/promise");

const app = express();

const port = 6000;

async function main() {
  const mysql = require("mysql2/promise");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  const [rows, fields] = await connection.execute("SELECT * FROM `users`");
  console.log(process.env);

  console.log(rows);
}

main();

app.get("/", function (req, res) {
  res.send("Hello World");
  console.log;
});

app.listen(port);
