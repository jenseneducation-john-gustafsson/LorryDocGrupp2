require("dotenv").config()
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

//MYSQL SELECT
const brands = "SELECT Brand FROM allcolumn WHERE brand IS NOT NULL";
const issues = "SELECT Issue FROM allcolumn WHERE issue IS NOT NULL";



app.get("/brand", (req, res) => {
  db.query(brands, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/issue", (req, res) => {
  db.query(issues, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get("/diagnostics/:issue", (req, res) => {

  switch (req.params.issue) {
    case 'Motor':
      db.query("SELECT diagnostics FROM AllColumn where diagnostics REGEXP 'motor'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Hjul':
      issue = 'hjul';
      db.query("SELECT diagnostics FROM AllColumn where diagnostics REGEXP 'hjul'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Lampor':
      issue = 'lampor';
      db.query("SELECT diagnostics FROM AllColumn where diagnostics REGEXP 'lampor'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Bromsar':
      issue = 'bromsar';
      db.query("SELECT diagnostics FROM AllColumn where diagnostics REGEXP 'bromsar'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;
  };
});

app.get("/remedy/:diagnostics", (req, res) => {

  switch (req.params.diagnostics) {
    case 'Motorlampa tänd':
      db.query("SELECT remedy FROM AllColumn where remedy REGEXP '11'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Lastbilen startar inte':
      db.query("SELECT remedy FROM AllColumn where remedy BETWEEN 21 AND 22", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Överhettad':
      db.query("SELECT remedy FROM AllColumn where remedy REGEXP '31'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Punktering':
      db.query("SELECT remedy FROM AllColumn where remedy REGEXP '41'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Lite luft':
      db.query("SELECT remedy FROM AllColumn where remedy REGEXP '51'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Hjul sitter löst (vibrerar)':
      db.query("SELECT remedy FROM AllColumn where remedy REGEXP '61'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Trasig lampa':
      db.query("SELECT remedy FROM AllColumn where remedy REGEXP '71'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Tar dåligt':
      db.query("SELECT remedy FROM AllColumn where remedy REGEXP '81'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;

    case 'Bromslampa lyser':
      db.query("SELECT remedy FROM AllColumn where remedy REGEXP '91'", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
      break;
  };
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});