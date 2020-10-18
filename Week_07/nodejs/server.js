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
        response.end(
`<html maam=a>
<head>
    <style>
body div #myid {
    width: 100px;
    background-color: #ff500;
}
body div img {
    width: 30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid" />
        <img />
    </div>
</body>
</html>`)
    })
}).listen(8090)

console.log('server start')