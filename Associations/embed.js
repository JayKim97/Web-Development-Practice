const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

//POST - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model("post", postSchema);

//USER - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
const User = mongoose.model("User", userSchema);


//add test user
// var newUser = new User({
//     email: "bob@alice.edu",
//     name: "Bob Alice"
// });

// newUser.posts.push({
//     title: "is this bloody working",
//     content: "embeded testing pls work"
// });

// newUser.save((err, user)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(user);
//     }
// });

//add test post
// var newPost = new Post({
//     title: "Reflection on Jeon Soyeon",
//     content: "Soyeon is the best"
// });
// newPost.save((err,post)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(post);
//     }
// });

User.findOne({name:"Bob Alice"},(err,user)=>{
    if(err){
        console.log(err)
    }
    else{
        user.posts.push({
            title: "(G)I-dle is the greatest",
            content: "(G)I-dle forever"
        });
        user.save((err,user)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(user);
            }
        });
    }
});