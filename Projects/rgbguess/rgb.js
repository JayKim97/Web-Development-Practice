var colors= getRandomCol(6);

var squares = document.querySelectorAll(".square");
var goal = pickColor();
var goaldisplay = document.getElementById("goal");
var message = document.getElementById("message");
var resetButton = document.getElementById("reset");
var h1 = document.querySelector("h1");
var easyBtn = document.getElementById("easy");
var hardBtn = document.getElementById("hard");
var numofsq=6;
start();
goaldisplay.textContent=goal;

resetButton.addEventListener("click",function(){
    resetButton.textContent="New Color";
    colors=getRandomCol(numofsq);
    goal=pickColor();
    goaldisplay.textContent=goal;
    message.textContent="";
    h1.style.backgroundColor="steelblue";
    start();
});

easyBtn.addEventListener("click",function(){
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numofsq=3;
    colors=getRandomCol(numofsq);
    goal=pickColor();
    goaldisplay.textContent=goal;
    for(var i=0;i<squares.length;i++){
        if(colors[i]){
            squares[i].style.backgroundColor=colors[i];
        }
        else{
            squares[i].style.display="none";
        }
    }
});

hardBtn.addEventListener("click",function(){
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    numofsq=6;
    colors=getRandomCol(numofsq);
    goal=pickColor();
    goaldisplay.textContent=goal;
    for(var i=0;i<squares.length;i++){
        squares[i].style.backgroundColor=colors[i];
        squares[i].style.display="block";
    }
});


function start(){
    for(var i =0; i<squares.length;i++){
        // add initial colours
        squares[i].style.backgroundColor = colors[i];
        //add click listners
        squares[i].addEventListener("click",function(){
            if(this.style.backgroundColor===goal){
                message.textContent="Correct";
                changeColor(goal);
                h1.style.backgroundColor=goal;
                resetButton.textContent="Play Again?";
            }
            else{
                this.style.backgroundColor="#232323";
                message.textContent="Try Again";
            }
        });
    }
};
function changeColor(color){
    for(var i=0; i<squares.length;i++){
        squares[i].style.backgroundColor=color;
    }
};

function pickColor(){
    var rando=Math.floor(Math.random()*colors.length);
    return colors[rando];
};

function getRandomCol(num){
    var arr=[];
    for(var i=0;i<num;i++){
        arr.push(randomCol());  
    }
    return arr;
};

function randomCol(){
    var arr=[];
    for(var i=0;i<3;i++){
        arr.push(Math.floor(Math.random()*256));
    }
    return "rgb("+arr[0]+", "+arr[1]+", "+arr[2]+")";
};