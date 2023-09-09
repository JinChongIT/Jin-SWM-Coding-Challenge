"use strict";

//Import modules
const server = require("./Server/Typescript/server");
const router = require("./Server/Typescript/router");
const requestHandlers = require("./Server/Typescript/requestHandlers");


//Different paths URL

const handle = {
    "/": requestHandlers.reqStart,

        //paths URL for resources
    "/mainStyleSheet": requestHandlers.reqCss
  };



server.startServer(router.route, handle); //SELF NOTE: Why not pass the entire router? Because can't be done only way refer to slide 16 of lec04a