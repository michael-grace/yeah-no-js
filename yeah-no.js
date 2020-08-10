// Yeah-No Counter
// Michael Grace 2020

const http = require("http");
const fs = require("fs");

const PORT = 3000;
const FILE = "count";
const NAME = "NAME";
const SAYING = "SAYING";

var server = http.createServer(function(req, res) {
    if (req.url == '/') {

        fs.readFile(FILE, "utf-8", (err, data) => {

            if (err === null) {

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`
                    <html style="text-align: center; font-family: Comic Sans, Arial; padding-top: 10em">
                    <!-- Michael Grace, August 2020, http://github.com/michael-grace -->
                    <h2> ` + NAME + ` has said ` + SAYING + ` </h2>
                    <h1>` + data + `</h1><h2> times. </h2>
                    <script>setTimeout(function() {location.reload();}, 60000);</script></html>`);

            } else {

                res.writeHead(500);
                res.write(err);

            }

            res.end();

        })

    } else if (req.url == "/add") {

        fs.readFile(FILE, "utf-8", (err, data) => {
            if (err === null) {
                newCount = Number(data) + 1;
                fs.writeFile(FILE, newCount, () => {});
            }
        })

        res.writeHead(302, { "Location": "/" });
        res.end();

    } else
        res.end('Invalid Request!');

});

server.listen(PORT);