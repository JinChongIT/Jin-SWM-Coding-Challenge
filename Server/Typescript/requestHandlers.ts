"use strict";

//Import modules
const fs = require('fs');
import { LoadData } from "../Typescript/Utils/fileProcessor"
import {RenderArticle} from "../../ClientApp/Typescript/htmlGeneration"

function reqStart(request: any, response: any) {  
	//console.log("entered reqStart(...) in requestHandlers.js");
	fs.readFile('../ClientApp/Html/index.html', 'utf8', function (err: unknown, data: string) { 
		
		if (err instanceof Error) {
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



export function reqArticle(request: any, response: any) {
	   //console.log("entered reqArticle(...) in requestHandlers.js");
	   var postData="";
		
		request.addListener('data', function (dataChunk: any) {
			postData += dataChunk;
		});
		
		request.addListener('end', function () {
			
			LoadData( (newSingleArticle) => {
				//console.log(RenderArticle(newSingleArticle))
				const singleArticleHTML = RenderArticle(newSingleArticle);
				const resultJSON = JSON.stringify(singleArticleHTML);
				response.writeHead(200,{'Content-Type': 'application/json'}); 
				response.write(resultJSON);
				response.end();
			});
			
		});
}


//Request handlers for resources functions
//
//
function reqCss(request: any, response: any) { 
	
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

function reqOnLoadStart(request: any, response: any) {  
	//console.log("entered reqOnLoadStart(...) in requestHandlers.js");
	const path = require('path').resolve(__dirname, '../../ClientApp/Typescript/onLoadScript.js');
	var readStream = fs.createReadStream(path);
	
	readStream.on('open', function () { 
		readStream.pipe(response); 
	});

	readStream.on('error', function () { 
		response.writeHead(404,{'Content-Type': 'text/plain'});
		console.log()
		response.write('Resource not found');
		response.end();	
	});
	
}



exports.reqStart = reqStart;
exports.reqOnLoadStart = reqOnLoadStart;


exports.reqCss = reqCss;
