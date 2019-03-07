var PORT = 8107;

var http = require("http");
var requests = require("./Server/modules/requests.js");
var headers = require("./Server/modules/headers.js");

http.createServer(function(request, response) {
	switch(request.method){
		case "POST":
			requests.processPostRequest(request, response);
			break;
		default:
			response.writeHead(501, headers["plain"]);
			response.end();
			break;
	}
}).listen(PORT);

console.log("Server running at localhost:8107");
