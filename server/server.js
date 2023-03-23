const express = require('express');
const cors = require('cors');
const app = express();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 1;
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
  
  const register = async function(req,res){

    const password = req.body.password;    
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    let user={       
      username:req.body.username, 
      password:encryptedPassword
    }   

    connection.query("INSERT INTO users SET?;",user, 
    (err, results, fields) => {
      if(err) {
        throw err;
      }else{
        res.send(results);
      }
    });
  }

  const checkEncryptedPassword = async function(req, res){
    
    let authJson=req.body;
    let u=authJson.username;
    let p=authJson.password;
    let passwords=[];
    let found=false;
    
    connection.query("SELECT * FROM users WHERE username=?;",u, 
    async function (err, results, fields) {
      if(err) {
        throw err;
      }else if(results.length===0){
        //No user found
        res.sendStatus(401);
      }else{
        results.map(function(user) {
      
          let passwordDB=`${user.password}`;
          passwords.push(passwordDB);          
        })
        for (let index = 0; index < passwords.length; index++) {
          const password = passwords[index];
          const comparison = await bcrypt.compare(p,password);
          if(comparison){
            const token = generateAccessToken({username:u});
            res.send(token);
            found=true;
          }else{
            if(index+1===passwords.length && !found){
              res.sendStatus(401);
            }
          }
        }
      }
      
    });

  }

  app.post('/api/Authenticate', (req, res) => {
    checkEncryptedPassword(req,res);
  });

  
  app.put('/api/Authenticate', (req, res) => {
    
    register(req,res);  
    
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

  app.get('/api/Employees', (req, res) => {
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
