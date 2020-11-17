const http = require("http");

http.createServer((req, res) => {

    if(req.url == '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.write("<h1>Accueil</h1>\n")
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.write("<span style='color:red'>Erreur 404</span>")
    }
    res.end()
}).listen(8080);
