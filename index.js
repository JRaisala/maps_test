//'use strict';

const Hapi = require('hapi');
const Good = require('good');

var todolist = [
    {
        "task":"Walk the cat",
        "owner":"Kristen"
    },
    {
        "task":"Water the plants",
        "owner":"Kristen"
    }
]

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route([
    {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
         }
    },
    {
    method: 'GET',
    path: '/api/v1/todolist',
    handler: function (request, reply) {
        reply(todolist);
         }
    },
    {
    method: 'POST',
    path: '/api/v1/todolist',
    handler: function(request, reply) {
        var newTask = {"task":request.payload.task, "owner":request.payload.owner};
        todolist.push(newTask);
        reply(todolist).code(201);
         }
    },
    {
    method: 'GET',
    path: '/api/v1/todolist/{index}',
    handler: function (request, reply) {
        reply(todolist[request.params.index-1]);
         }
    },
    {
    method: 'PUT',
    path: '/api/v1/todolist/{index}',
    handler: function(request, reply) {
        var newTask = {"task":request.payload.task, "owner":request.payload.owner};
        todolist[request.params.index-1] = newTask;
        reply(todolist[request.params.index-1]);
         }
    },
    {
    method: 'DELETE',
    path: '/api/v1/todolist/{index}',
    handler: function(request, reply) {
        delete todolist[request.params.index-1];
        reply().code(204);
         }
    },
]);

server.start(function(err) {
    console.log('running at 3000')
});


