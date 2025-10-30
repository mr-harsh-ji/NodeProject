const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    database:"college",
    password:"",
    user:"root"
    

})

db.connect(error=>{
        if(error){
            console.log("Database connection error" + error);
        }

        else{
            console.log("Database connected");
        }
    }
)

module.exports = db; 
