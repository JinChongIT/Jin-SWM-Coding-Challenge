"use strict";

//Import modules
const server = require("./Server/Typescript/server");
const router = require("./Server/Typescript/router");
const requestHandlers = require("./Server/Typescript/requestHandlers");


//Different paths URL

const handle = {
    "/": requestHandlers.reqStart,

        //paths URL for resources
    "/mainStyleSheet": requestHandlers.reqCss,
    "/onLoadStart": requestHandlers.reqOnLoadStart,
    "/requetArticle": requestHandlers.reqArticle
  };

 


server.startServer(router.route, handle); 