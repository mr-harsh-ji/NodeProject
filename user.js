const express = require("express");
const db = require("./db")
const bcrypt = require("bcrypt")
const app = express();
 
app.use(express.json()); // middle ware

//users : API
const users = [];

app.get("/users",(request, response)=>{

    db.query("SELECT *FROM users",(error,result)=>{
        if(error) return response.status(500).json({message : "Server internal error"});
                response.status(200).json(result);

    });
});

 

app.post("/users",(request, response)=>{

    const name = request.body.name;
    const age = request.body.age;

    db.query("INSERT INTO users(name, age) VALUES (?, ?)",[name,age],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"})
            response.status(201).json({ id: result.insertId, name: name, age: age});
    });
})

app.put("/users/:id",(request, response)=>{
     const id = request.params.id;
    const name = request.body.name;
    const age = request.body.age;
    
 
    db.query("UPDATE users SET name =?, age=? WHERE id=?",[id,name,age],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"+error})
            response.status(200).json({message: "DATA UPDATED SUCCESSFULLY", name: name, age: age});
    });
})

app.delete("/users/:id",(request, response)=>{
    const id = request.params.id

    db.query("DELETE FROM users WHERE id=?",[id],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"+error})
            response.status(200).json({message : "users DATA DELETED SUCCESSFULLY"});
    });
})

//password hashing - register

// app.post("/api/users", async (request, response)=>{
//     const name = request.body.name;
//     const email = request.body.email;
//     const password = request.body.password;
//     const passwordHash = await bcrypt.hash(password, 10)// 2 ka power 10 standard
    
//     db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",[name, email, passwordHash],(error,result)=>{
//     console.log(error);
//     if(error) return response.status(500).json({message : "Server internal error" + error});
//     response.status(201).json({id: result.insertId, name : name, email: email});
//     });
// });

//password hashing - login

// app.post("/api/users/login", async (request, response)=>{
//     const email = request.body.email;
//     const password = request.body.password;

// db.query("SELECT * FROM users WHERE email=?",[ email ],async(error,result)=>{
//         console.log(error);
//     if(error) return response.status(500).json({message : "Server internal error" + error});
//     const dbPassword = result[0].password;
//     const isPasswordSame = await bcrypt.compare(password, dbPassword);
//     if(isPasswordSame){
//         response.status(200).json({message: "login successfully"})
//     }
//     else{
//     response.status(201).json({message: "login failed"})
//     }
    
//     });

// }); 


app.listen(3400, ()=>{
    console.log("Server is running on 3400");
})