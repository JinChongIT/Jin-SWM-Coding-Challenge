"use strict";

function route(pathName: any, handle: any, request: any, response: any) {  //SELF NOTE: Isn't any bad? Yes, but converting my node.js web framework to typescript was complex and this is easiest conversion
	//console.log("entered router(...) router.js");
	if(typeof handle[pathName] === 'function') {
		handle[pathName](request, response); //invoke the relevant function
	} else {
		response.writeHead(404,{'Content-Type': 'text/plain'}); 
		response.write('Resource not found');
		response.end();	
	}
}


exports.route = route; //SELF NOTE: Why export route? This allows other files to use this nodeJS method