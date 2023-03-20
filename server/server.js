const express = require('express');
const cors = require('cors');
const app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeesDatabase"
});

app.use(cors());
app.use(express.json());

app.post('/api/Employees', (req, res) => {
    var dataEmployee = req.body;
    
    connection.query("INSERT INTO employees SET?;",dataEmployee, 
    (err, results, fields) => {
      if(err) throw err;
        res.send(results);
    });
  });

  app.get('/api/Employees', (req, res) => {
    connection.query("SELECT * FROM employees;", (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
  });
  app.delete('/api/Employees/:id', function (req, res) {

    var id = req.params.id;
    console.log(id);
    connection.query("DELETE FROM employees WHERE id=?;", id, (err, results, fields) => {
        if(err) throw err;
        res.send(results);
      });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });
