const router = require('express').Router();
const {verifyUserJWT} = require('./verifyToken');

let friendsList = [
    {
        "firstname": "Kumar",
        "lastname": "G",
        "email": "Kumar@example.com",
        "dob": "12-2-2020"
    },
    {
        "firstname": "Kumar 2",
        "lastname": "G",
        "email": "Kumar2@example.com",
        "dob": "12-2-2020"
    },
    {
        "firstname": "Kumar3",
        "lastname": "G",
        "email": "Kumar3@example.com",
        "dob": "12-2-2020"
    },
];


//GET all users
router.get('/', verifyUserJWT, (req,res)=>{
    try{
        res.status(200).json(friendsList);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET user by email id
router.get("/:email", verifyUserJWT, (req,res)=>{
    const emailParam = req.params.email;
    let filterd_friend = friendsList.filter((friend) => friend.email === emailParam);
    res.status(200).json(filterd_friend);
});

//UPDATE user by email id
router.put('/:email', verifyUserJWT, (req,res)=>{
    try{
        let filtered_friend = friendsList.filter((friend) => friend.email === req.params.email )

        if(filtered_friend.length > 0){
            updfriend = filtered_friend[0];
            if(req.body.firstname){ updfriend.firstname = req.body.firstname }
            if(req.body.lastname){ updfriend.lastname = req.body.lastname }
            if(req.body.dob){ updfriend.dob = req.body.dob }
    
            friendsList = friendsList.filter((friend)=>{ req.params.email != friend.email })
            friendsList.push(updfriend);
            res.status(200).json(friendsList);
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//ADD a user
router.post('/new', verifyUserJWT, (req,res)=>{
    let newFriend = {
        "firstname":req.body.firstname, 
        "lastname":req.body.lastname, 
        "email":req.body.email, 
        "dob":req.body.dob 
    }
    try{
        friendsList.push(newFriend);
        res.status(201).json(`New friend ${req.body.firstname} added successfully`);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE a user by email id
router.delete('/:email', verifyUserJWT, (req,res)=>{
    try{
        let filtered_friend = friendsList.filter((friend) => req.params.email === friend.email);
        if(filtered_friend.length > 0){
            let filtered_friend = friendsList.filter((friend) => req.params.email != friend.email);
            friendsList = filtered_friend
            res.status(200).json(friendsList);
        }else{
            res.status(500).json('User not found');
        }
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;