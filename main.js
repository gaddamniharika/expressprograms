const exp = require('express');
const server = exp();
const fs = require('fs');
server.use(exp.json());

server.get('/',function(req,res){
    res.send("enter '/users' endpoint to view the users");
    console.log("enter '/users/parameters' to create new user by post");
    console.log("enter '/users/parameter' get new user");
});

server.get('/users',function(req,res){
    var content = fs.readFileSync('./users.json');
    res.send(JSON.parse(content));
    res.end();
});

server.get("/users/:id",function(req,res){ 
    var content = fs.readFileSync('./users.json');
    var result  = JSON.parse(content);   
    var index   = req.params.id;
    if(index in result)
        res.send(result[index]);
    else
        res.status(404).send("information not found");
});

server.post("/users/:id",function(req,res){
  var content = fs.readFileSync('./users.json');
  var result = JSON.parse(content);
  var id = req.params.id;
  if(!(id in result))
  {
    result[id] = {"name" : req.body.name, "pwd" : req.body.pwd, "profession" : req.body.prof};
    res.send(result);
    var obj = JSON.stringify(result,content);
    fs.writeFile('./users.json',obj,()=>res.send("successfully ccreated"));
  }
  else
  res.status(404).send("information already exist cant create new object");
});

server.put("/users/:id",function(req,res){
    var content = fs.readFileSync('./users.json');
    var result  = JSON.parse(content);
    var id  =  req.params.id;
    if(id in result) 
    {
        var name = (req.body.name);
        var pwd  = (req.body.pwd);
        var prof = (req.body.prof);
        var obj  =  result[id];
        if(name.length > 0)
          obj["name"] = name;
        if(pwd.length > 0)
          obj["pwd"] = pwd;
        if(prof.length > 0)
          obj["profession"] = prof;
        var obj = JSON.stringify(result);
        fs.writeFile('./users.json',obj,()=>res.send("successfully updated"));
    }
    else
    {
        res.status(400).send("invalid number");
    }
})
server.delete("/users/:id",function(req,res){
   var content = fs.readFileSync('./users.json');
   var result  = JSON.parse(content);
   var id  =  req.params.id;
   if(id in result)
   {
      delete result[id];
      var obj = JSON.stringify(result);
      fs.writeFile('./users.json',obj,()=>res.send("successfully deleted"));
   }
   else
   {
       res.status(400).send("information not found");
   }

});
server.listen(2021);