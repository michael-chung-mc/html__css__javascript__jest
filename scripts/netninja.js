const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {
    console.log(req.url, req.method);
    let path = '../src/';
    switch(req.url) {
        case '/':
            path += 'dom.html';
            break;
        case '/about':
            path += 'signup.html';
            break;
        default:
            path += 'error404.html';
            break;
    }
    // res.setHeader('Content-Type','text/plain');
    res.setHeader('Content-Type','text/html');
    // res.write('hello world');
    // res.write('<p>hello world</p>');
    fs.readFile(path, (err,data) => {
        if (err) {
            console.log(err); 
            res.end();
        } else {
            res.write(data);
            res.end();
            //res.end(data);
        }
    })
});

server.listen(3000, 'localhost', ()=> {
    console.log('listening for requests on port 3000');
});