let http = require('http')
let fs = require("fs");
let archiver = require("archiver")
let child_process = require("child_process")
let querystring = require('querystring')

/* fs.stat('./index.html', (err, stats) => {
    
}) */

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.6c1cc43e728ac78d`)

http.createServer(function(request, response) {
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1])
    publish(query)
}).listen(8083)

function publish(token) {
    console.log('token', token)
    let request = http.request({
        hostname: '127.0.0.1',
        port: 8082,
        method: "POST",
        path:'/publish?token=' + token.token,
        headers: {
            'Content-Type': "application/octet-stream"
        }
    }, response => {
        console.log(response)
    })
    
    let file = fs.createReadStream('./index.html')
    
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    archive.directory('./sample/', false)
    archive.finalize();
    
    archive.pipe(request)
}
/* file.pipe(request)
file.on('end', () => request.end()); */