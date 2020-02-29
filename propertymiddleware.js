const express = require("express");
const app = express();
const fs = require("fs");

app.use(function propertymiddleware(req,res,next)
{
    req.statusMessage = " request status message setted";
    res.write(req.statusMessage);
    next();
});
app.get("/",(req,res,next) => {res.write("\n welcome to the page ----GET method\n"),next()},(req,res)=>{
      res.statusMessage = "response Status Message setted";
      res.write(res.statusMessage);
      res.end();
    });
app.listen(2023);