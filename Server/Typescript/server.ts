"use strict";

//Import modules
const http = require('http');
const url = require('url');

//Export HTTP Server

function startServer(route: any, handle: any) {  //SELF NOTE: Isn't any bad? Yes, but converting the node.js web framework to typescript was tricky and this is easiest conversion

	http.createServer( function (request: any, response: any) { 
	
		const pathName = url.parse(request.url).pathname;
		route(pathName, handle, request, response);
	
	}).listen(80, "127.0.0.1") //call the createServer method when server is accessed by client

	console.log('Server running http://127.0.0.1:80/'); 
}

exports.startServer = startServer; //SELF NOTE: Why export server? This allows other files to use this nodeJS method