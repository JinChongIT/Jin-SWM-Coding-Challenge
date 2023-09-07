"use strict";

//Import modules
const http = require('http');
const url = require('url');

//Export HTTP Server

function startServer(route, handle) { 

	http.createServer( function (request, response) { //SELF NOTE: Why not provide function name? Because in this file we want to define + call server in one method
	
		const pathName = url.parse(request.url).pathname;
		route(pathName, handle, request, response);
	
	}).listen(80, "127.0.0.1") //call the createServer method when server is accessed by client

	console.log('Server running http://127.0.0.1:80/'); 
}

exports.startServer = startServer; //SELF NOTE: Why export server? This allows other files to use this nodeJS method