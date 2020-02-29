const exp = require('express');
const server  = exp();
server.get('/',(req,res)=>(res.send("web server created successfully using express")));
server.listen(2000);