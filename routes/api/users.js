const express = require('express');
const router = express();
const user = require('../../users.json');
const fs = require('fs');
const session = require('express-session');
const path = require('path');
const requestIp = require('request-ip');
 
const ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req); 
    next();
};
router.get('/logged',(req,res) => res.send(req.session.on));
router.get('/ip',(req,res) =>res.send(req.connection.remoteAddress));
router.get('/',(req,res) => res.send(user));
router.get('/:name',(req,res) => {

    console.log(req.session.users);
    var aux = JSON.parse(JSON.stringify(user)).users;
    console.log(aux)
    if(session.users)
        for(x in session.users){
            if(session.users[x] == req.params.name){
            console.log("Da")
            res.status(400).json({ msg: 'user deja logat' });
            return;
            }
        }
    for(x in aux)
        if(aux[x].name == req.params.name){
            console.log("nu")
            res.send(aux[x]);
            return
        }
    res.status(400).json({ msg: 'userul nu exista' });
});
router.post('/',(req,res) => {
    console.log(req.body);
    req.session.on = req.body.name;
    req.session.admin = req.body.admin;
    console.log("post",req.body.name)
    if(!session.users)
        session.users = [];
    session.users.push(req.body.name);
    console.log(session.users)
    console.log("aici");
    console.log(req.session);
    res.json(req.body);
});
router.get('/restricted/addalbum',(req,res) =>{
    console.log(req.session.on);
    if(req.session.admin == "true")
        res.sendFile(path.join(__dirname, '../../restricted/addAlbum.html'));
    else{
    res.status(403);
    res.send("restricted acces")
    }
});
router.get('/restricted/addartist',(req,res) =>{
    console.log(req.session.on);
    if(req.session.admin == "true")
        res.sendFile(path.join(__dirname, '../../restricted/addArtist.html'));
    else{
    res.status(403);
    res.send("restricted acces")
    }
});
router.get('/log/out',(req,res)=>{
    var index = session.users.indexOf(req.session.on);
    console.log(index,req.session.on)
    if (index > -1) 
        session.users.splice(index, 1);
    console.log(session.users)
    req.session.on = false;
    req.session.admin = false;
    res.send();
});
module.exports = router;
