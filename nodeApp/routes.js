const fs=require('fs')


const requestHandler=(req,res)=>{
    const url=req.url
    const method= req.method
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url ==='/message' && method==='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsebody=Buffer.concat(body).toString();
            const message=parsebody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        })
        fs.writeFileSync('message.txt','Dummy');
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    
    }
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page of Node</title></head>');
    res.write('<body><h1>Hello From my node.js Server </h1></body>');
    res.write('</html>');
    res.end()
    // process.exit();
    
}

// first way of exporting module:
module.exports={
    handler:requestHandler,
    sometext:'Some Hard Coated Text'
}

//second way of exporting modules
module.exports= requestHandler;


//shortcut method of exporting the modules
exports.handler=requestHandler;
exports.sometext='Some Hard Coated Text.'


