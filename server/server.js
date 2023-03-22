const express = require('express');
const cors = require('cors');
const app = express();
var mysql = require('mysql');

const jwt= require('jsonwebtoken');
require('dotenv').config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeesDatabase"
});

app.use(cors());
app.use(express.json());

  function generateAccessToken(username){
    return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn:'1800s'});
  }

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('=')[1];

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)

      if (err) return res.sendStatus(401)

      req.user = user

      next()
    })
  }

  app.post('/api/Authenticate', (req, res) => {

    let authJson=req.body;
    let u=authJson.username;
    let p=authJson.password;
    let auth = [u,p];
    
    connection.query("SELECT * FROM users WHERE username=? AND password=?;",auth, 
    (err, results, fields) => {
      console.log(results);
      if(err) {
        throw err;
      }else if(results.length===0){
        //No user found
      }else{
        const token = generateAccessToken({username:u});
        res.json({token});
      }
      
    });
  });

  app.post('/api/Employees',authenticateToken, (req, res) => {
    var dataEmployee = req.body;
    connection.query("INSERT INTO employees SET?;",dataEmployee, 
    (err, results, fields) => {
      if(err) {
        throw err;
      }else{
        res.body=results.insertId;
        res.send(results);
      }
    });
  });

  app.get('/api/Skills', (req, res) => {
    connection.query("SELECT * FROM skills;", (err, results) => {
      if(err) throw err;
      res.send(results);
    });
  });

  app.get('/api/Employees',authenticateToken, (req, res) => {
    connection.query("SELECT * FROM employees;", (err, results) => {
      if(err) {
        throw err;
      }else{
        res.send(results);
      }
    });
  });

  app.delete('/api/Employees/:id',authenticateToken, function (req, res) {
    var id = req.params.id;
    connection.query("DELETE FROM employees WHERE id=?;", id, (err, results) => {
      if(err) {
        throw err;
      }else{
        res.sendStatus(200);
      }
      });
  });


  app.put('/api/Employees/:id',authenticateToken, function (req, res) {
    
    var dataEmployee = req.body;

    var id = req.params.id;
    var query2 = "first_name"+"='"+dataEmployee.first_name+"', "+"last_name"+"="+" '"+dataEmployee.last_name+"', "+"dob"+"="+" '"+dataEmployee.dob+"', ";
    var query3 = "email"+"="+" '"+dataEmployee.email+"', "+"skill_level"+"="+dataEmployee.skill_level+", "+"active"+"="+dataEmployee.active+", "+"age"+"="+dataEmployee.age;
    var query="UPDATE employees SET "+query2+query3+" WHERE id="+id+";";
    connection.query(query, (err, results, fields) => {
      if(err) {
        throw err;
      }else{
        res.send(req.body);
      }
      });
  });

  app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });
