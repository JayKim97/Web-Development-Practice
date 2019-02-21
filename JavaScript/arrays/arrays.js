var colors = ["red", "green", "blue"];
var len = colors.length //3
colors.push("yellow"); //push to the end
len = colors.length //4
colors.pop();       // pop the end
len = colors.length//4

colors.unshift("purple"); //add to the front
colors.shift();//removes the front element
colors.indexOf("green") //gieves index of green in array

var fruits = ["Banana","orange","lemon","apple"];
var citrus=fruits.slice(1,3); //creates array ["orange","lemon"];
var cpyfruits=fruits.slice();//copys whole array

//traversing array in javascript 
for(var i=0;i<fruits.length;i++){
    console.log(fruits[i]);
}
//2nd way


fruits.forEach(function(fruit){
    console.log(fruit);
});