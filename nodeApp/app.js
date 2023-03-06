const http = require("http");
const express= require('express')
const app= express();

//Adding the middleware methdology

app.use((req,res,next)=>{
    console.log("In the Middleware!")
    next();      //Allow the request to continue to the next middleware in line.
})

app.use((req,res,next)=>{
    console.log('In Another Middleware!')
    res.send('<h1>Hello! From PRAVEEN KUMAR <h2>Using the Middleware Functionality</h2></h1>')
})

const server= http.createServer(app);
server.listen(3030);
