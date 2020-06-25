var logged = false;
window.onload=function() {
background();
var xhr = new XMLHttpRequest();
xhr.open('GET','http://localhost:8080/api/users/logged',true);
xhr.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
			res = xhr.responseText;
			if(res != "false" && res){
				modify();
				inactivity();
				logged = true;
			}
	}
}
xhr.send();
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
var x = document.getElementById('login');
x.addEventListener('submit',form);
}
var time;
var inactivity = function () {
    window.onload = reset;
    document.onmousemove = reset;
    document.onkeypress = reset;
};
function logout() {
	alert("You are now logged out.")
	var xhr = new XMLHttpRequest();
	xhr.open('GET','http://localhost:8080/api/users/log/out',true);
	xhr.send();
	window.location.reload();
}
function reset() {
	clearTimeout(time);
	time = setTimeout(logout, 3000)
}
function background()
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET','http://localhost:8080/api/albums',true);
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			res = xhr.responseText;
			var res = JSON.parse(xhr.responseText);
			for(i = 0;i<res.length;i++){
				if(res[i][normal(document.title)])
					document.body.style.backgroundImage = `url(${res[i]["background"]})`;
			}
		}
	}
	xhr.send();
}
function modify(){
	x = document.getElementsByClassName("openbutton")[0];
	x.innerHTML = "logged";
	x.style.color = "green";
	x = document.getElementsByTagName('ul')[0];
	li = document.createElement('li');
	a = document.createElement('a');
	a.href = "http://localhost:8080/api/users/restricted/addalbum";
	a.innerHTML = "Add Album";
	li.appendChild(a);
	x.appendChild(li);
	li = document.createElement('li');
	a = document.createElement('a');
	a.href = "http://localhost:8080/api/users/restricted/addartist";
	a.innerHTML = "Add Artist";
	li.appendChild(a);
	x.appendChild(li);
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
	var list = document.getElementById("album");
	var xhr = new XMLHttpRequest();
		xhr.open('GET','http://localhost:8080/api/albums/'+normal(document.title)+'/'+normal(a),true);
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
				var res = JSON.parse(xhr.responseText);
				if('songs' in res)
					list.innerHTML = newAlbum(res);
			}
			else if(this.readyState == 4 && this.status == 400){
					list.innerHTML = "";
					alert("bad req");
			}
        }
		xhr.send();
}
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
	if(!logged)
	if (x.style.display=='block')
		x.style.display='none';
	else
		x.style.display='block';
	else
		logout();
}
var tries = 0
function form(){
	elem = this.elements;
	var ok = 0;
	form = this;
	var xhr = new XMLHttpRequest();
	event.preventDefault();
	xhr.open('GET','http://localhost:8080/api/users/'+elem.name.value,true);
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var res = JSON.parse(xhr.responseText);
			if(res.on == true)
			{
				alert("on");
				return
			}
			if(res.pass == elem.pass.value){
				getIp(res);
			}
			else if(tries<4){
				var x = document.getElementById('tries');
				x.innerHTML =`wrong pass, ${5 - ++tries} more tries`;
			}
			else{
				var x = document.getElementById('tries');
				x.innerHTML =`wrong pass, wait 10 seconds`;
				wait();
			}
		}
		else if(this.readyState == 4 && this.status == 400)
			alert("wrong user")
	}
	xhr.send();
}
function post(res,ip)
{
	alert(ip);
	var a = new XMLHttpRequest();
	a.open('POST','http://localhost:8080/api/users/',true);
	a.setRequestHeader("Content-Type", "application/json");
	a.send(JSON.stringify(res));
	window.location.reload();
}
function getIp(res)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET','http://api.ipify.org/',true);
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
				ip = xhr.responseText;
				post(res,ip);
		}
	}
	xhr.send();
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
function wait(){
	document.getElementsByClassName("loginbtn")[0].disabled = true;
    setTimeout(function() {
		document.getElementsByClassName("loginbtn")[0].disabled = false;
		var x = document.getElementById('tries');
		x.innerHTML =``;
	}, 10000);
   tries = 0
 }