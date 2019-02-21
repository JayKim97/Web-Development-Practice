var button = document.querySelector("button");
var par = document.querySelector("p");
button.addEventListener( "click" , function() {
    par.textContent= "changed" ;
    par.style.color="red";
});