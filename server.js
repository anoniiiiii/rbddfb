'use strict';

require('dotenv').config();
const Hapi = require('hapi');
const Vision = require('vision');
const Ejs = require('ejs');

console.log(JSON.stringify(process.env));
// Create a server with a host and port
const server = Hapi.server({
    host: 'localhost',
    port: process.env.PORT || 8080
});


// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, h) {
        return h.view('index', {
            title: 'examples/ejs/templates/basic | Hapi ' + request.server.version,
            message: 'Hello Ejs!'
        });
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        return h.view('index', {
            title: 'examples/ejs/templates/basic | Hapi ' + request.server.version,
            message: 'Hello Ejs!'
        });
    }
});


// Start the server
async function start() {
    await
        server.register(Vision);

    server.views({
        engines: {ejs: Ejs},
        relativeTo: __dirname,
        path: 'view'
    });
    try {
        await
            server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();