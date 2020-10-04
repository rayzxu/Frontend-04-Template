const http = require('http');

http.createServer((request, response) => {
    let body = []
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(new Buffer(chunk.toString()))
        console.log('body: ', body)
    }).on('end', () => {
        console.log(typeof body)
        body = Buffer.concat(body).toString()
        console.log(body)
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('hello world\n')
    })
}).listen(8090)

console.log('server start')