const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

app.use(function logmiddleware(req,res,next)
{
   console.log("ip method "+req.method);
   console.log("time stamp "+Date());
   var content = fs.readFileSync("./logmiddleware.json");
   var obj = JSON.parse(content);
   obj = obj +" "+ "ip method "+req.method + " " + " timestamp "+" "+Date();
    var obj = JSON.stringify(obj);
    fs.writeFileSync("./logmiddleware.json",obj, () => console.log("information successfully updated in logmiddleware.json"));
   next();
});
app.get("/",(req,res)=> res.send("welcome to the page ----GET method"));
app.post("/",(req,res)=> res.send("welcome to the page ----POST method"));
app.listen(2022);