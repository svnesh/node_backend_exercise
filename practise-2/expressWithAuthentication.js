const express = require('express');
const app = new express();

const session = require('express-session');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecret';

const PORT = 5000;

app.use(express.json());
app.use(session({secret:"fingerprint"}))

let users = [];


const doesUserAlreadyExists = (username) =>{
    let filter_user = users.filter((user) => {
        return user.username === username
    });

    if (filter_user.length > 0){
        return true
    }
    else{
        return false
    }
}

app.post('/login', (req,res)=>{
    const username = req.param('username');
    const password = req.param('password');

    if(!username && !password){
        return res.status(404).json("Params are empty");
    }

    if(doesUserAlreadyExists(username)){
        let accessToken = jwt.sign({
            data: username
        }, JWT_SECRET, {expiresIn: 60*60});

        req.session.authorization = {
            accessToken, username
        }

        return res.status(200).json("user logged in successfully");
    }
    else{
        return res.status(404).json("User not exists");
    }
})


app.post('/register', (req,res)=>{
    const username = req.param('username');
    const password = req.param('password');

    //console.log(username + " - " + password)
    if(username && password){
        if(!doesUserAlreadyExists(username)){
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User registered successfully"});
        }
        else{
            return res.status(404).json({message: "User already exists"});
        }
    }
    return res.status(404).json({message: "Unable to register user"});
});

app.use('/auth', (req,res,next)=>{

    if(req.session.authorization){
        let rqTk = req.session.authorization["accessToken"];
    
        let verifiedUser = jwt.verify(rqTk, JWT_SECRET, (err, user)=>{
            if(!err){
                req.user = user;
                next();
            }
            else{
                return res.status(404).json({message: "Token is not valid"});
            }
        })
    }
    else{
        return res.status(404).json({message: "User not logged in"});
    }
})

app.get('/auth/get_message', (req,res) => {
    return res.status(200).json("Message success, user logged!");
})

app.listen(PORT, ()=>{
    console.log(`Backend server running in port: ${PORT}`);
})