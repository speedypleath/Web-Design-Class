const express = require('express');
const router = express();
const album = require('../../albums.json');
const fs = require('fs');

router.get('/',(req,res) => res.send(album));
router.use(express.urlencoded({ extended: true }));
router.get('/:artist',(req,res) => {
    var aux;
    for(artists in album){
        if(album[artists][normal(req.params.artist)]){
            aux = album[artists][normal(req.params.artist)];
            break;
        }
    }
    if(!aux)
        return res.status(400).json({ msg: 'artistul nu exista' });
    return res.send(aux);
});
router.get('/:artist/:name',(req,res) => {
    var aux;
    for(artists in album){
        if(album[artists][normal(req.params.artist)]){
            aux = album[artists][normal(req.params.artist)];
            break;
        }
    }
    if(!aux)
        return res.status(400).json({ msg: 'artistul nu exista' });
    for(x in aux){
        if(normal(aux[x].name) == normal(req.params.name)){
            res.send(aux[x]);
            return
        }
    }
    res.status(400).json({ msg: 'albumul nu exista' });
});
function normal(a){
	a = a.replaceAll('â','a');
	a = a.replaceAll('ș','s');
	a = a.replaceAll('ă','a');
    a = a.replaceAll(' ','');
    a = a.replaceAll('/','');
    a = a.toLowerCase();
	return a;
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

router.post('/:artist',(req,res) => {
    if(req.files)
        req.files.img.mv('./html/img/' + req.files.img.name);
    var ok
    var aux = album[artists][normal(req.params.artist)];
    for(x in aux)
        if(normal(aux[x].name) == normal(req.body.album))
        ok = x;
    songs = {}
    if(!ok){
        var nou = {
            name: req.body.album,
            songs: [],
            img: "http://localhost:8080/img/"+req.files.img.name
        }
        for(i in req.body.songs){
            song = {'name':req.body.songs[i]};
            nou.songs.push(song);
        }
        console.log(album[artists][normal(req.params.artist)]);
        album[artists][normal(req.params.artist)].push(nou)
        res.send(album);
        fs.writeFile('albums.json',JSON.stringify(album, null, 4),function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    }
    else{
        for(i in req.body.songs){
            song = {'name':req.body.songs[i]};
            console.log(album[artists][normal(req.params.artist)][ok],ok);
            album[artists][normal(req.params.artist)][ok].songs.push(song);
        }
        console.log(album)
        fs.writeFile('albums.json',JSON.stringify(album, null, 4),function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    }
});

module.exports = router;