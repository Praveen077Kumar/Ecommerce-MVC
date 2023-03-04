const fs= require('fs')


const HandlingRequests=(req,res)=>{
    const url= req.url;
    const method=req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><h1>Hello Dear Applicant your are on right path</h1></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url ==='/users'){
        res.setHeader('Content-Type','text/html');
        res.write("<html>");
        res.write('<head><title>Assignment 1</title></head>')
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
        res.write('</html>');
        return res.end()
    }

    if(url=== '/create-user'){
        const body=[];
        req.on('data',chunk=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsebody=Buffer.concat(body).toString();
            console.log(parsebody)
            console.log(parsebody.split('=')[1]);
        });
        res.statusCode=302;
        res.setHeader('Location','/')
        res.end();
    }

}


module.exports=HandlingRequests;