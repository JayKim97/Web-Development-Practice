const express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo_app", { useNewUrlParser: true });

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//initialize express-session
app.use(require("express-session")({
    secret: "102kfdsaoeiqpalzmcjfidsapqrg",
    resave: false,
    saveUninitialized: false
}));
app.set("view engine", "ejs");
//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//responsible for encoding/decoding data
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

// ==============================================
// ROUTE

app.get("/",(req, res)=>{
    res.render("home");
});

app.get("/secret",isLoggedIn,(req, res)=>{
   res.render("secret"); 
});

// AUTH ROUTES
app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{
        if(err){
            console.log("err");
            return res.render("register");
        }
        else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/secret");
            });
        }
    });

});

//LOGIN ROUTE
app.get("/login",(req,res)=>{
    res.render("login");
});
//LOGIN LOGIC
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),(req,res)=>{
});

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


app.listen(3000,()=>{
    console.log("Server started");
});