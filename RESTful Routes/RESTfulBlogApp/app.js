const   express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        methodOverride = require("method-override"),
        expressSanitizer = require("express-sanitizer");

//app config
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

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
    //sanitize input
    console.log(req.body)
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body)
    //create blog
    Blog.create(req.body.blog, (err,newBlog)=>{
        if(err){
            res.render("new");
        }
        else{
            console.log(newBlog);
            res.redirect("/blogs/"+newBlog.id);
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
    Blog.findById(req.params.id, (err,foundBlog)=>{
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("edit",{blog: foundBlog});
        }
    });
});

//update route
app.put("/blogs/:id",(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog,(err, updatedBlog)=>{
        //sanitize input
        console.log(req.body)
        req.body.blog.body = req.sanitize(req.body.blog.body);
        console.log(req.body)
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//destroy route
app.delete("/blogs/:id",(req,res)=>{
    //destroy blog
    Blog.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

app.listen(3000,()=>{
    console.log("Server is running");
});