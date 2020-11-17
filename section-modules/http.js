const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      res.write("<h1>Accueil</h1>\n");
      res.end();
    } else if (req.url == "/test") {
      fs.readFile("section-modules/test.txt", "utf-8", (err, data) => {
        if (err) {
          send404(res);
        } else {
          res.write(data);
          res.end();
        }
      });
    } else {
      send404(res);
    }
  })
  .listen(8080);

function send404(res) {
  res.writeHead(404, {
    "Content-type": "text/html",
  });
  res.write("<span style='color:red'>Erreur 404</span>");
  res.end();
}
