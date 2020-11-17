const http = require("http");

http.createServer((req, res) => {

    if(req.url == '/') {
        res.write("Accueil\n")
    } else {
        res.write("Erreur 404")
    }
    res.end()
}).listen(8080);
