const express = require('express');
const app = new express();

const PORT = 5000;

app.use(express.json());

let loginDetails = [];
let monthNames = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];

app.get('/', (req,res)=>{
    res.send('Welcome to express server');
})

app.get('/logindetails', (req,res)=>{
    res.send(JSON.stringify(loginDetails));
})

app.post('/login/:name', (req,res)=>{
    loginDetails.push({"name":req.params.name, "login_time":new Date()})
    res.send(`User logged successfully at ${req.params.name}`);
})

app.get('/:name', (req,res)=>{
    res.send(`Selected user name is ${req.params.name}`);
})

app.get('/fetchMonth/:num', (req,res)=>{
    let rqMth = parseInt(req.params.num) - 1;
    let month = ((rqMth < 12 && rqMth >= 0) ? (monthNames[rqMth]) : "Not valid")
    res.send(`Selected month is ${month}`);
})

app.listen(PORT, ()=>{
    console.log(`Backend server connected on port ${PORT}`);
})