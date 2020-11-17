const http = require("http");

http.createServer((req, res) => {
    res.write("Hello\n")
    res.write(req.url)
    res.end()
}).listen(8080);
