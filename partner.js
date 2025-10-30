const express = require("express");
const db = require("./db")
const bcrypt = require("bcrypt")
const app = express();
 
app.use(express.json()); // middle ware

//partners : API
const partners = [];

app.get("/partners",(request, response)=>{

    db.query("SELECT *FROM partners",(error,result)=>{
        if(error) return response.status(500).json({message : "Server internal error"});
                response.status(200).json(result);

    });
});

 

app.post("/partners",(request, response)=>{

    const name = request.body.name;
    const partner_no = request.body.partner_no;
    const mobile = request.body.mobile;

    db.query("INSERT INTO partners(name, partner_no, mobile) VALUES (?, ?, ?)",[name, partner_no, mobile],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"})
            response.status(201).json({ id: result.insertId, name: name, partner_no: partner_no, mobile: mobile});
    });
})

app.put("/partners/:id",(request, response)=>{
     const id = request.params.id;
    const name = request.body.name;
    const partner_no = request.body.partner_no;
    const mobile = request.body.mobile;
    
 
    db.query("UPDATE partners SET name =?, partner_no=?, mobile=? WHERE id=?",[id,name, partner_no, mobile],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"+error})
            response.status(200).json({message: "DATA UPDATED SUCCESSFULLY", name: name, partner_no: partner_no, mobile: mobile});
    });
})

app.delete("/partners/:id",(request, response)=>{
    const id = request.params.id

    db.query("DELETE FROM partners WHERE id=?",[id],(error, result)=>{
        if(error) return response.status(500).json({message : "Server internal error"+error})
            response.status(200).json({message : "partners DATA DELETED SUCCESSFULLY"});
    });
})

//password hashing - register

app.post("/api/user", async (request, response)=>{
    const name = request.body.name;
    const partner_no = request.body.partner_no;
    const password = request.body.password;
    const passwordHash = await bcrypt.hash(password, 10)// 2 ka power 10 standard
    
    db.query("INSERT INTO partners (name, partner_no, password) VALUES (?, ?, ?)",[name, partner_no, passwordHash],(error,result)=>{
    console.log(error);
    if(error) return response.status(500).json({message : "Server internal error" + error});
    response.status(201).json({id: result.insertId, name : name, partner_no: partner_no});
    });
});

//password hashing - login

app.post("/api/user/login", async (request, response)=>{
    const email = request.body.email;
    const password = request.body.password;

db.query("SELECT * FROM partners WHERE email=?",[ email ],async(error,result)=>{
        console.log(error);
    if(error) return response.status(500).json({message : "Server internal error" + error});
    const dbPassword = result[0].password;
    const isPasswordSame = await bcrypt.compare(password, dbPassword);
    if(isPasswordSame){
        response.status(200).json({message: "login successfully"})
    }
    else{
    response.status(201).json({message: "login failed"})
    }
    
    });

}); 

app.listen(3400, ()=>{
    console.log("Server is running on 3400");
})