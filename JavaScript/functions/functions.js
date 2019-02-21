//syntax
/*
function doSomething(num){
    console.log("HELLO WORLD");
    console.log(num*num);
    return num*num;
}

doSomething();
*/

function kebabToSnake(str){
    if(typeof str !=='string'){
        console.log("you fucked up");
        return;
    }
    return str.replace(/-/g,"_");
}

console.log(kebabToSnake("h-e-l-l-o"));