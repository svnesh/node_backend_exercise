const express = require('express');
const app = new express();

const jwt = require('jsonwebtoken');
const JWT_SECRET = "mysecret";

const userRoute = require('./routes/users.js');

const PORT = 5000;
app.use(express.json());

app.use("/user", userRoute);

app.post("/login", (req,res)=>{
    const user = req.body.user;

    if(!user){
        return res.status(404).json('Body empty');
    }
    let accessToken = jwt.sign({
        data: user
    }, JWT_SECRET);

    return res.status(200).json({"accesstoken": accessToken});
})

app.listen(PORT, ()=>{
    console.log(`Backend server listening in port: ${PORT}`);
})