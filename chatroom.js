const http = require('http')
const fs = require('fs')


let server = http.createServer(function (request, response) {
    let myPath = new URL(`http://localhost:8000${request.url}`)
    if (request.method === 'GET') {
        if (myPath.pathname === '/messages') {
            fs.readFile('messages.json', 'utf8', (err, data) => {
                if (err) {
                    response.end(err)
                } else {
                    response.end(data)
                }
            })
            //if the user doesn't use /messages correctly
        } else {
            response.end('The path was not valid.')
        }
    }
    else if (request.method === 'POST') {
        if (myPath.pathname === '/messages') {
            let body = '';
            request.on('data', chunk => {
                body += JSON.stringify(chunk.toString())
            });
            request.on('end', () => {
                let date_ob = new Date();
                body +=' Posting Date:'+ JSON.stringify(date_ob) +'\n'
                fs.appendFile('messages.json', body, err => {
                    if (err) {
                        console.log(err)
                        return
                    }else {
                        console.log('File written successfully\n')
                        response.end('Written Sucessfully')
                    }
                })
            });
        }
    }
})
server.listen(8000)