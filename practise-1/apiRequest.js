const express = require('express');
const myapp = express()
myapp.use(express.json());

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'verysecret';

myapp.post("/signin", (req,res) => {
    const { uname, pwd } = req.body;

    if(uname == "user" && pwd == "password"){
        return res.json({
            token: jwt.sign({ user: "user" }, JWT_SECRET),
        });
    }
    return res
        .status(401)
        .json({message: "Invalid username or password"});
});

myapp.get("/employee", (req,res) =>{
    let tkn = req.header('Authorization');
    if(!tkn){
        return res.status(401).send("No token");
    }
    if (tkn.startsWith('Bearer ')){
        tokenvalue = tkn.slice(7, tkn.length).trimLeft();

        const verficationStatus = jwt.verify(tokenvalue, JWT_SECRET);
        if (verficationStatus.user === "user"){
            return res.status(200).json({message: "Access successfull to employee endpoint"});
        }
    }


});

myapp.listen(5000, ()=>{
    console.log("API server is listening: 5000");
});