const http = require("http");
const express= require('express')
const app= express();

//Adding the middleware methdology
app.use('/',(req,res,next)=>{
    console.log('This always run!')
    next();
})

app.use('/add-product',(req,res,next)=>{
    console.log('In Another Middleware!')
    res.send('<h1>In the "add-product middleware"</h1>')
})
app.use('/',(req,res,next)=>{
    console.log("In the Middleware!")
    // next();      //Allow the request to continue to the next middleware in line.
    res.send('<h1>Routing the Middleware section. </h1>')
})



const server= http.createServer(app);
server.listen(3030);
