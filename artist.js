var song1 = new Song("Sfârșit","matteo.html");
var song2 = new Song("Năduf","matteo.html");
var album1 = new Album("Sfârșit // Năduf",song1,song2);
localStorage.setItem(album1.name,JSON.stringify(album1));
var song1 = new Song("Primejda","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/556835454&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true");
var song2 = new Song("Anemia","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/556835448&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true");
var album1 = new Album("01 EP",song1,song2);
localStorage.setItem(album1.name,JSON.stringify(album1));
var song1 = new Song("Jupiter","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/556835454&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true");
var song2 = new Song("Paradiso","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/556835448&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true");
var album1 = new Album("Inana x Sarra",song1,song2);
localStorage.setItem(album1.name,JSON.stringify(album1));
var song1 = new Song("Desfigurat","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/556835454&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true");
var song2 = new Song("Sterp","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/556835448&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true");
var album1 = new Album("Desfigurat + Sterp",song1,song2);
localStorage.setItem(album1.name,JSON.stringify(album1));
var song1 = new Song("Armageddon","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/556835454&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true");
var album1 = new Album("Armageddon",song1);
localStorage.setItem(album1.name,JSON.stringify(album1));
localStorage.setItem(album1.name,JSON.stringify(album1));
window.onload=function() {
elements = document.getElementsByClassName("frame");
for(var i = 0; i < elements.length; i++) {
	var d = elements[i];
	d.addEventListener("click", toggleAlbum);
}
var x = document.getElementsByClassName('fa fa-search')[0].parentElement;
x.addEventListener('click',displaySearchbar);
var x = document.getElementsByClassName('cancelbtn')[0];
x.addEventListener('click',cancel);
var x = document.getElementsByClassName('openbutton')[0];
x.addEventListener('click',displayLogin);
var x = document.getElementById('input');
x.addEventListener('focus',displayResults);
x.addEventListener('blur',function(){setTimeout(hideResults,100);});
x.addEventListener('keyup',updateResults);
x.addEventListener('keypress',exception);
}
function Song(name,href) {
	this.target = "iframe_a";
	this.name = name;
	this.href = href;
}
function Album(...params)
{	
	this.name = params[0];
	this.songs = new Array();
	for(i=1;i<params.length;i++){
		this.songs.push(params[i]);
	}
}
function toggleAlbum() {
var aux = document.getElementById("art");
var album = this.getElementsByTagName('p')[0].innerHTML;
var curent = document.querySelector('input[name="album"]:checked');
if(curent!=null && document.getElementById(album).checked == false)
	curent.parentNode.getElementsByClassName("overlay")[0].style.opacity = 0;
if (document.getElementById(album) != null && document.getElementById(album).checked == true){
	return false;
}
aux.style.visibility = 'visible';
aux.style.opacity = 0;
setTimeout(changeInnerHtml,500,album);
var x = this.getElementsByClassName("overlay")[0];
x.style.opacity = 1;
setTimeout(fadeIn,500,aux);

}
function fadeIn(a) {
	a.style.opacity = 1;
}
function changeInnerHtml(a) {
	document.getElementById("p1").innerHTML = a;
	album1 = localStorage.getItem(a);
	var list = document.getElementById("album");
	list.innerHTML = newAlbum(JSON.parse(album1));
}
function displaySearchbar(){
	var x = document.getElementById('input');
	if (x.style.visibility == 'visible'){
		x.style.visibility = 'hidden';
	}
	else{
		x.style.visibility = 'visible';
		x.focus();
	}
}
function displayResults(){
	var x = document.getElementById('results');
	x.style.display = 'block';
}
function hideResults()
{
	var x = document.getElementById('results');
	x.style.display = 'none';
	var x = document.getElementById("input");
	x.style.visibility = 'hidden';
}
function updateResults()
{
	var input = event.currentTarget.value.toUpperCase();
	var ul = document.getElementById("results");
	var list = ul.getElementsByTagName('li');
	for (i = 0; i < list.length; i++){
		var a = list[i].getElementsByTagName("a")[0].textContent;
		if (a.toUpperCase().indexOf(input) > -1)
            list[i].style.display = "";
		else
            list[i].style.display = "none";
	}
}
function exception()
{
	if((event.key<65||event.key>90)&&(event.key<97||event.key>122))
		event.preventDefault();
}
function newSong(song)
{
	var li = document.createElement("li");
	var a = document.createElement("a");
	var node = document.createTextNode(song.name);
	a.appendChild(node);
	a.href = song.href;
	a.target = song.target;
	li.appendChild(a);
	return li;
}
function newAlbum(album)
{
	var ol = document.createElement("ol");
	for(i=0;i<album.songs.length;i++){
		var aux = newSong(album.songs[i]);
		ol.appendChild(aux)
	}
	return ol.innerHTML;
}
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
function cancel(){
	document.getElementById('id01').style.display='none';
}
function displayLogin(){
	var x = document.getElementById('id01');
	if (x.style.display=='block')
		x.style.display='none';
	else
		x.style.display='block';
}