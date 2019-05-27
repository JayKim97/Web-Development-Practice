//http request using node
// var request = require("request");
// request("http://www.google.com", function(error, response, body){
//     if (!error && response.statusCode==200){
//         console.log(body);
//     } else {
//         console.log("something went wrong!");
//         console.log(error);
//     }
// });

const request = require("request");
request("https://jsonplaceholder.typicode.com/users/1", (error, response, body)=>{
    //eval(require('locus'));
    if (!error && response.statusCode==200){
        const parsedData = JSON.parse(body);
        console.log(parsedData.name + " lives in " +parsedData.address.city);
    }
});