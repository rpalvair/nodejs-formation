const http = require("http");

http.createServer((req, res) => {

    if(req.url == '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.write("Accueil\n")
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.write("Erreur 404")
    }
    res.end()
}).listen(8080);
