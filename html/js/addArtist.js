window.onload=function() {
    var x = document.getElementsByClassName("cancelbtn")[0]
    x.addEventListener('click',goBack);
    var x = document.getElementById("login");
    x.addEventListener('submit',getArtists)
}
var i = 0;
function getArtists()
{
    event.preventDefault();
    xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:8080/api/albums',true);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
                res = xhr.responseText;
                submit(res);
        }
    }
    xhr.send();
}
function goBack() {
    window.history.back();
  }
function submit(albums)
{
    event.preventDefault();
    var artist = document.getElementsByName("artist")[0];
    var img = document.getElementsByName('img')[0];
    var description = document.getElementsByName("descriere")[0];
    data = new FormData();
    data.append('artist', artist.value);
    data.append('img',img.files[0]);
    data.append('description',description.value);
    if(!artist.value||!description.value||!img.files[0]){
        alert("return");
        return;
    }
    var x = document.getElementsByName("artist")[0].value;
    xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:8080/api/albums/new/'+x,true);
    xhr.send(data); 
}