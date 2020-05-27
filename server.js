const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');
const users = require('./users');
const session = require('express-session');
const fs = require('fs');
const user = require('./routes/api/users');
const albumStuff = require('./middleware/albumStuff.js');
const logged = require('./middleware/logged.js');;
const pug = require('pug');
const album = require('./albums.json');
const toolbar = require('./toolbar.json');
const http = require('http');
var fileupload = require("express-fileupload");


app.use(fileupload());


app.use(express.static(path.join(__dirname,'html'),{index: 'main.html'}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "lalalala",
    resave: false,
    saveUninitialized: false,
}));
//app.use(albumStuff);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
var aux
app.get('/artist/:name',(req,res) => {
    console.log(req.params.name)
    http.get('http://localhost:8080/api/albums/'+req.params.name, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            return res.render('artist',{
                titlu: req.params.name,
                toolbar,
                albums: JSON.parse(data)
            });
               res.send();
        });
    });

});
function getAlbums(a)
{
}
app.use('/api/albums',require('./routes/api/album'));
app.use('/api/users',require('./routes/api/users'));
app.use('/artist',require('./routes/api/toolbar'));

app.post('/users',(req,res) => {
    req.session.on = true;
    console.log("aici");
    console.log(req.session);
    res.json("da")
});
app.get('/logged',(req,res) => res.send(req.session.on));

app.get('/restricted/test.html',(req,res) =>{
    if(req.session.on)
        res.sendFile(path.join(__dirname, '/restricted', 'test.html'));
});
//app.use('/api/toolbar',require('./routes/api/toolbar'));

app.listen(PORT,()=>console.log('yay'));