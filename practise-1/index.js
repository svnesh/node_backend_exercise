var http = require('http');
var time = require('./today');

const requestListener = function(req, res){
    res.writeHead(200);
    res.end(`Hello world! The date today is ${time.getDate()}`);
}

const port = 8080;
const server = http.createServer(requestListener);
console.log('server listening on port:' + port);
server.listen(8080);