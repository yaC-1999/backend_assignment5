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
  connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/contact", (req, res) => {
  connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(result.length + 1);
      // const id = req.body.id;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const phone_number = req.body.phone_number;
      const work_number = req.body.work_number;

      connection.query(
        "INSERT INTO users  VALUES (?,?,?,?,?) ",
        [result.length + 1, first_name, last_name, phone_number, work_number],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Posted!");
          }
        }
      );
    }
  });
  // connection.query(
  //   "INSERT INTO users  VALUES (?,?,?,?,?) ",
  //   [id, first_name, last_name, phone_number, work_number],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send("Posted!");
  //     }
  //   }
  // );
});

app.get("/contact/:id", (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE id=?",
    req.params.id,
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/contact/:id", (req, res) => {
  const id = req.params.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const work_number = req.body.work_number;

  connection.query(
    "UPDATE users SET first_name= ? , last_name= ? , phone_number= ? , work_number =? WHERE id=?",
    [first_name, last_name, phone_number, work_number, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("Updated!");
      }
    }
  );
});

app.delete("/contact/:id", (req, res) => {
  connection.query(
    "DELETE FROM users WHERE id=?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Deleted!");
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`On port ${port}`);
  }
});
