var obj ={
    name: "chuck",
    age: 50,
    add: function(x,y){
        return x+y;
    }
}

var comments={};
comments.data=["hello", "good","google it"];
comments.print = function(){
    this.data.forEach(function(el){
        console.log(el);
    });
}