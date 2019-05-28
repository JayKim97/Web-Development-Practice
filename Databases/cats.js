//learning the basic of mongodb
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save((err, cat)=>{
//     if(err){
//         console.log("something went wrong!");
//     }
//     else{
//         console.log("saving worked");
//         console.log(cat);
//     }
// });

//create and add at the same time
Cat.create({
    name: "Snow",
    age: 3,
    temperament: "Nice"
},(err, cat)=>{
    if(err){
        console.log("something went wrong!");
    }
    else{
        console.log("saving worked");
        console.log(cat);
    }
});

Cat.find({},(err,cats)=>{
    if(err){
        console.log("Error:");
        console.log(err)
    }
    else{
        console.log("all cats")
        console.log(cats);
    }
});