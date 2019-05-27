const express = require("express");
const request = require("request");
const app = express();

app.get("/results", (req, res)=> {
    request("http://www.omdbapi.com/?s=star&apikey=thewdb", (error, response,body) => {
        if(!error && response.statusCode==200){
            const results = JSON.parse(body);
            res.send(results["Search"][0]["Title"]);
        }
    });
    
});

app.listen(3000, () => {
    console.log("Server Started");
})