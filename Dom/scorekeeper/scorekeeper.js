var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var reset = document.getElementById("reset");
var h1 = document.querySelector("h1");
var p1dis = document.getElementById("p1dis");
var p2dis = document.getElementById("p2dis");
var upto = document.getElementById("upto");
var box = document.querySelector("input");
var max = 5;
var p1s = 0;
var p2s=0;

p1.addEventListener("click", function(){
    if(p1s<max){
        p1s++;
        p1dis.textContent = p1s;}
});

p2.addEventListener("click", function(){
    if(p2s<max){
        p2s++;
        p2dis.textContent = p2s;}
});

reset.addEventListener("click",function(){
    p1s=0;
    p2s=0;
    p1dis.textContent = p1s;
    p2dis.textContent = p2s;
});

box.addEventListener("input",function(){
    max=box.value;
    upto.textContent=max;
});



