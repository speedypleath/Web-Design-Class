const express = require('express');
const router = express();
const user = require('../../users.json');
const fs = require('fs');
const session = require('express-session');

router.get('/',(req,res) => res.send(user));
router.get('/:name',(req,res) => {
    const {on} = req.session;
    console.log(on);
    var aux = JSON.parse(JSON.stringify(user)).users;
    for(x in aux)
        if(aux[x].name == req.params.name){
            res.send(aux[x]);
            return
        }
    res.status(400).json({ msg: 'userul nu exista' });
});
module.exports = router;
