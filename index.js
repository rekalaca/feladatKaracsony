const http = require('http');
const fs = require('fs');
const port = 4444;

const server = http.createServer((req, res) => {

    console.log("Új kérés érkezett:");
    console.log(req.url);
    console.log(req.method);


    switch (true) {
        case req.url === '/' && req.method === 'GET':
            fs.readFile('./view/index.html', (err, data) => {
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(data);
            });
            break;
        case req.url === '/style.css' && req.method === 'GET':
            fs.readFile('./view/style.css', (err, data) => {
                res.setHeader('Content-Type', 'text/css');
                res.writeHead(200);
                res.end(data);
            });
            break;

        case req.url === '/diszek' && req.method === 'GET':
            fs.readFile('./data/diszek.json', (err, data) => {
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(data);
            });
            break;

        case req.url === '/diszek.js' && req.method === 'GET':
            fs.readFile('./public/diszek.js', (err, data) => {
                res.setHeader('Content-Type', 'application/javascript');
                res.writeHead(200);
                res.end(data);
            });
            break;

        case req.url === '/gomb.jpg' && req.method === 'GET':
            fs.readFile('./public/gomb.jpg', (err, data) => {
                res.setHeader('Content-Type', 'image/jpg');
                res.writeHead(200);
                res.end(data);
            });
            break;

        case req.url === '/alma.jpg' && req.method === 'GET':
            fs.readFile('./public/alma.jpg', (err, data) => {
                res.setHeader('Content-Type', 'image/jpg');
                res.writeHead(200);
                res.end(data);
            });
            break;

            case req.url === "/diszek" && req.method === "POST":
            let ujak = '';
            req.on('data', (chunk) => {
                ujak += chunk.toString();
            });
            req.on('end', () => {
                const ujDiszem = JSON.parse(ujak);



                fs.readFile('./data/diszek.json', (err, data) => {
                    let adatok = JSON.parse(data);
                    adatok.push({
                        "alakzat": ujDiszem.alakzat,
                        "atmero": ujDiszem.atmero,
                        "piros": ujDiszem.piros
                        
                    });
                    fs.writeFile('./data/diszek.json', JSON.stringify(adatok), () => {
                        res.end(JSON.stringify(adatok));
                    })
                })
            })

            break;


        default:
            fs.readFile("./view/error.html", (err, file) => {
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(404);
                res.end(file);
            })


    }


});

server.listen(port);