const login = async function(req,res){    
var email= req.body.email;    
var password = req.body.password;    
pool.query('SELECT players.*, count(history.userId) AS gamesPlayed FROM players LEFT JOIN history ON history.userId=players.id WHERE email_address = ?',
[email], async function (error, results, fields) {      
    if (error) {        
        res.send({          
        "code":400,          
        "failed":"error occurred",          
        "error" : error        
        })      
    }else{        
        if(results.length >0){          
            const comparison = await bcrypt.compare(password, results[0].password)          
            if(comparison){              
                res.send({                
                    "code":200,                
                    "success":"login successful",                
                    "id": results[0].id,                
                    "userName": results[0].user_name,                
                    "score": results[0].score,                
                    "gamesPlayed": results[0].gamesPlayed,                
                    "boardPref": results[0].boardPref              
                })          
            }else{            
                res.send({                 
                    "code":204,                 
                    "error":"Email and password does not match"            
                })          
            }        
        } else{          
            res.send({            
                "code":206,            
                "error":"Email does not exist"              
            });        
        }      
    }      
});  
}