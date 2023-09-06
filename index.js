"use strict";

//Import modules
const server = require("./Server/Js/server");
const router = require("./Server/Js/router");
const requestHandlers = require("./Server/Js/requestHandlers");

//Different paths URL
const handle = {};
handle["/"] = requestHandlers.reqStart;


//paths URL for resources
handle["/mainStyleSheet"] = requestHandlers.reqCss;


server.startServer(router.route, handle); //SELF NOTE: Why not pass the entire router? Because can't be done only way refer to slide 16 of lec04a