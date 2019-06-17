var fs = require("fs");
var data = '';
var http = require("http");
var url = require("url");
 
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
       "Content-Type": "text/plain",
   });

   var data = fs.readFileSync('demo.txt');// 创建可读流
   fs.readFile('demo.txt', function (err, data) {
      if (err) {
          return err;
      }
      response.write(data.toString());response.end();
   });
   
   
}).listen(8080);
console.log("Server has started.");
