const express = require("express");
var mysql = require("mysql");
var app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

app.get("/", (req, res) => {
  console.log("hiiii");
  connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
  // const [rows, fields] = connection.query("SELECT * FROM `users`");
  // console.log(rows);
  // res.send(rows);
});

// console.log(connection.query("SELECT * FROM `users`"))

app.post("/contact", (req, res) => {
  console.log("injaaa");
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    work_number: req.body.work_number,
  };
  console.log(data);

  connection.query("INSERT INTO `users` VALUES(?)", data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Posted!");
    }
  });
});
// console.log(process.env)

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connected!");
//   }
// });

// async function main() {
// const mysql = require("mysql2/promise");

//   const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//   });

//   connection.connect((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Connected!");
//     }
//   });
//   // const [rows, fields] = await connection.execute("SELECT * FROM `users`");
// // }

// // main();

// app.get("/", (req, res , next) => {
//   console.log("44444");
//   res.send('hello')
// next();
//   // const [rows, fields] = connection.query("SELECT * FROM `users`");
//   // console.log(rows);
//   // res.send(rows);
// });

// app.post("/cct", function (req, res) {
//   console.log("req.body");
//   console.log([req.body]);
// });

// app.post("/contact", function (req, res) {
//   // console.log(req.body);
//   const data = {
//     first_name: "11",
//     last_name: "12",
//     phone_number: 13,
//     work_number: 14,
//   };
//   console.log(data);

//   connection.execute(
//     "INSERT INTO `users` VALUES(?,?,?,?)",
//     data,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Posted!");
//       }
//     }
//   );

//   // const id = 3;
//   // const first_name = req.body.first_name;
//   // const last_name = req.body.last_name;
//   // const phone_number = req.body.phone_number;
//   // const work_number = req.body.work_number;
//   // connection.execute(
//   //   "INSERT INTO `users` VALUES(?,?,?,?)",
//   //   [id , first_name, last_name, phone_number, work_number],
//   //   (err, result) => {
//   //     if (err) {
//   //       console.log(err);
//   //     } else {
//   //       res.send("Posted!");
//   //     }
//   //   }
//   // );
// });

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`On port ${port}`);
  }
});
