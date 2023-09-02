const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {
    console.log(req.url, req.method);
    let path = '../src/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/contact-me':
            path += 'contact.html';
            break;
        default:
            path += '404.html';
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

server.listen(8080, 'localhost', ()=> {
    console.log('listening for requests on port 8080');
});