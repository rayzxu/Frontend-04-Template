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
`<html maaa=a>
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
#container {
    display: flex;
    height: 300px;
    width: 500px;
    background-color: rgb(255,255,255);
}

#container #myid {
    width: 200px;
    height: 100px;
    background-color: rgb(255,0,0);
}

#container #c1{
    flex: 1;
    background-color: rgb(0,255,0);
}
    </style>
</head>
<body>
    <div id="container">
        <img id="myid" />
        <img id="c1" />
    </div>
</body>
</html>`)
    })
}).listen(8090)

console.log('server start')