let http = require('http');
let unzipper = require('unzipper')
let querystring = require('querystring')
let https = require('https')

function auth(request, response) {
    console.log(request, response)
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)/)[1]);
    getToken(query.code, function(info) {
        console.log(info)
        response.write(`<a href='http://localhost:8083/?token=${info.access_token}'> publish </a>`)
        response.end();
    })
}

function getToken(code, callback) {
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.6c1cc43e728ac78d&client_secret=83ce5c6b20cfcb5e364f9b099e94e2ee79240cb2`,
        port: 443,
        method: "POST"
    }, function(response) {
        let body = ''
        response.on('data', chunk => {
            body += chunk.toString()
            // console.log(chunk.toString())
        })
        response.on('end', chunk => {
            callback(querystring.parse(body))
        })
    });
    request.end()
}

function publish(request, response) {
    console.log(request, response)
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)/)[1]);
    getUser(query.token, info => {
        if(info.login === 'rayzxu') {
            request.pipe(unzipper.Extract({ path: './'}));
            request.on('end', function() {
                response.end('successful!')
            })
        }
    })
}

function getUser(token, callback) {
    let request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        port: 443,
        method: "GET",
        headers: {
            'User-Agent': 'toyPublisher',
            Authorization: `token ${token}`
        }
    }, function(response) {
        let body = ''
        response.on('data', chunk => {
            body += chunk.toString()
            // console.log(chunk.toString())
        })
        response.on('end', chunk => {
            console.log('body: ',body)
            callback(JSON.parse(body))
        })
    });
    request.end()
}

http.createServer(function(request, response) {
    if(request.url.match(/^\/auth\?/)) {
        return auth(request, response);
    }
    if(request.url.match(/^\/publish\?/)) {
        return publish(request, response);
    }

    console.log(request)
    /* let outFile = fs.createWriteStream('./temp.zip');// ../server/public/temp.zip
     */
    // 

}).listen(8082)