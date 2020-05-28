window.onload=function() {
    var x = document.getElementById("add");
    x.addEventListener('click',add)
    var x = document.getElementsByClassName("cancelbtn")[0]
    x.addEventListener('click',returnMain);
    var x = document.getElementById("login");
    x.addEventListener('submit',getAlbums)
}
var i = 0;
function getAlbums()
{
    event.preventDefault();
    xhr = new XMLHttpRequest();
    var x = this.elements.artist.value;
    xhr.open('GET','http://localhost:8080/api/albums/'+x,true);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200 && x){
                res = xhr.responseText;
                submit(res);
        }
    }
    xhr.send();
}
function submit(albums)
{
    event.preventDefault();
    var album = document.getElementsByName("album")[0];
    var img = document.getElementsByName('img')[0];
    var songs = document.getElementsByClassName("song");
    if(!album.value||!songs[0].value||!img.files[0])
        return
    data = new FormData();
    data.append('album', album.value);
    data.append('img',img.files[0]);
    for(x in songs)
        if(songs[x].value)
            data.append('songs',songs[x].value)
    xhr = new XMLHttpRequest();
    var x = document.getElementsByName("artist")[0].value;
    alert(x)
    xhr.open('POST','http://localhost:8080/api/albums/'+x,true);
    xhr.send(data); 
}
function returnMain()
{
    window.location = "http://localhost:8080/";
}
function add()
{
    i += 1;
    alert(i)
    var x = document.getElementsByClassName("container")[0];
    var label = document.createElement("label");
    label.innerText = 'Song '+i;
    var input = document.createElement("input")
    input.setAttribute('name','song[]');
    input.setAttribute('class','song');
    input.setAttribute('type','text');
    input.setAttribute('placeholder','Song..');
    label.appendChild(input);
    x.appendChild(input);
}
