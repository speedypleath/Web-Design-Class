
var x = document.getElementsByClassName('fa fa-search')[0].parentElement;
x.addEventListener('click',display);

function display(){
	var x = document.getElementsByName('search')[0];
		x.style.visibility = 'visible';

}