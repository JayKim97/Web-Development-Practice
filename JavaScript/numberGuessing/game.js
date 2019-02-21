const number=10;

var userGuess = Number(prompt("Guess a number"));

var guess=false;
while(guess!=true){
    if(userGuess>number){
        userGuess =Number(prompt("number is too high guess again"));
    }else if(userGuess<number){
        userGuess =Number(prompt("number is too low guess again"));
    }
    else{
        alert("You guessed correctly number was "+number);
        guess=true;
    }
}