const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true });

const Post = require("./models/posts")
const User = require("./models/user")

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Gmail"
// });

//posting and adding reference to user
// Post.create({
//    title: "How to the best burger pt. 4",
//    content:"don't forget fries" 
// },(err,post)=>{
//     User.findOne({email: "bob@gmail.com"},(err, foundUser)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             foundUser.posts.push(post);
//             foundUser.save((err, data)=>{
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

//Find user
// Find all posts for that user
User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err,user)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(user);  
    }
});