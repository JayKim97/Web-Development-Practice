const express = require("express");
const request = require("request");
const app = express();
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("search");
});

app.get("/results", (req, res)=> {
    var search = req.query.search;
    var url = "http://www.omdbapi.com/?s="+search+"&apikey=thewdb"
    request(url, (error, response,body) => {
        if(!error && response.statusCode==200){
            const data = JSON.parse(body);
            res.render("results",{data:data});
        }
    });
    
});

app.listen(3000, () => {
    console.log("Server Started");
})