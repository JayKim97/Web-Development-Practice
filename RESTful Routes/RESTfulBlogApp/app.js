const   express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose");

//app config
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//mongoose/model config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);

//RESTful routes

app.get("/",(req,res)=>{
    res.redirect("/blogs");
});

//index route
app.get("/blogs",(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{blogs: blogs});     
        }
    });
});

//new route
app.get("/blogs/new",(req,res)=>{
    res.render("new")
});
//create route
app.post("/blogs",(req,res)=>{
    //create blog
    Blog.create(req.body.blog, (err,newBlog)=>{
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

//show route
app.get("/blogs/:id",(req,res)=>{
    Blog.findById(req.params.id, (err, foundBlog)=>{
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//edit route
app.get("/blogs/:id/edit",(req,res)=>{
    res.render("edit");
})


app.listen(3000,()=>{
    console.log("Server is running");
});