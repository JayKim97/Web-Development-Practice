const express   = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    seedDB      =require("./seeds"),
    Comment     =require("./models/comment"),
    User        = require("./models/user");

//REQUIRING ROUTES
const   campgroundRoutes = require("./routes/campgrounds"),
        commentRoutes = require("./routes/comments"),
        indexRoutes = require("./routes/index");


//==================
//ROUTES REQUIREMENT
//==================
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//===========================================
// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "7029sjsie983jjanmzcivurewoqmdfa",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//============================================

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
 });

 app.use(indexRoutes);
 app.use("/campgrounds/:id/comments",commentRoutes);
 app.use("/campgrounds", campgroundRoutes);


app.listen(3000,()=>{
    console.log("The YelpCamp Server");
});