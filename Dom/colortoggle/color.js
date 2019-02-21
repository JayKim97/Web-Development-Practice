var button = document.querySelector("button");
var backgroud=document.querySelector("body");
var change = false;

button.addEventListener("click", function(){
    if(!change){
        backgroud.style.backgroundColor="purple"; 
        change=true;
    }
    else{
        backgroud.style.backgroundColor="white"; 
        change=false;
    }
});