"use strict";

//Import modules
const fs = require('fs');

function reqStart(request, response) { 
	//console.log("entered reqStart(...) in requestHandlers.js");
	fs.readFile('../ClientApp/Html/index.html', 'utf8', function (err, data) { 
		
		if (err) {
			response.writeHead(404,{'Content-Type': 'text/plain'}); 
			response.write('Resource not found');
			response.end();	
		} else {
			response.writeHead(200,{'Content-Type': 'text/html'});
			response.write(data);
			response.end();	
		}
	});
}


//Request handlers for resources functions
//
//
function reqCss(request, response) {
	
	response.writeHead(200, {'Content-Type': 'text/css'});
	let readStream = fs.createReadStream("../ClientApp/Css/main.css");
	
	readStream.on('open', function () { 
		readStream.pipe(response);
	});
	
	readStream.on('error', function () {
		response.writeHead(404,{'Content-Type': 'text/plain'});
		response.write('Resource not found');
		response.end();	
	});
}



exports.reqStart = reqStart;


exports.reqCss = reqCss;
