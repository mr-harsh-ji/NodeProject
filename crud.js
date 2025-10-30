const express = require("express");
const db = require("./db")
const bcrypt = require("bcrypt")
const app = express();
 
app.use(express.json()); // middle ware

//students : API
const students = [];

app.get("/students",(request, response)=>{

    db.query("SELECT *FROM students",(error,result)=>{
        if(error) return response.status(500).json({message : "Server internal error"});
                response.status(200).json(result);

    });
});

 

app.post("/students",(request, response)=>{

    const uId = students.length+1;
    const uFirstName = request.body.fname;
    const uLastName = request.body.lname;
    const uEmail = request.body.email;
    const uDob = request.body.dob;

    db.query("INSERT INTO students(fname,lname, email, dob) VALUES (?, ?, ?)",[uFirstName,uLastName,uEmail,uDob],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"})
            response.status(201).json({id: result.insertId, id: uId, fname: uFirstName, lname: uLastName, email: uEmail, dob: uDob});
    });
})

app.put("/students/:id",(request, response)=>{
     const uId = request.params.id;
    const uFirstName = request.body.fname;
    const uLastName = request.body.lname;
    const uEmail = request.body.email;
    const uDob = request.body.dob;

    db.query("UPDATE students SET fname =?,lname=?, email=?, dob=? WHERE id=?",[uFirstName,uLastName,uEmail,uDob],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"+error})
            response.status(200).json({message: "DATA UPDATED SUCCESSFULLY", fname: uFirstName, lname: uLastName, email: uEmail, dob: uDob});
    });
})

app.delete("/students/:id",(request, response)=>{
    const uId = request.params.id

    db.query("DELETE FROM students WHERE id=?",[uId],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"+error})
            response.status(200).json({message : "students DATA DELETED SUCCESSFULLY"});
    });
})



app.listen(3400, ()=>{
    console.log("Server is running on 3400");
})