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

app.get("/",(req, res)=>{
    res.render("landing");
});

app.get("/campgrounds", (req,res)=>{
    
    //get all campgrounds from DB
    Campground.find({},(err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })
});

app.post("/campgrounds",(req,res)=>{
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description
   var newCampground = {name: name, image: image, description: desc};
   //create a new campground and save to DB
   Campground.create(newCampground,(err, newlyCreated)=>{
       if(err){
           console.log(err);
       }
       else{
            res.redirect("/campgrounds");
       }
   });
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("campgrounds/new");
});

//show - more info about one campground
app.get("/campgrounds/:id",(req,res)=>{
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundCampground)
            //render show template
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //render show template with that campground
});

// =================
// COMMENTS ROUTE
// =================
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err, campground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
    //look up campground using ID
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            //create new comment
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

//=====================
//authentication routes
//=====================
app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password,(err, user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN ROUTE
app.get("/login",(req,res)=>{
    res.render("login")
});

app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),(req,res)=>{
    
});

//LOGOUT ROUTE
app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/campgrounds")
});

//MIDDLEWARE
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen(3000,()=>{
    console.log("The YelpCamp Server");
});