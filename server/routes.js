// Load modules

var User      = require('./controller/user'),
    Static    = require('./static');

// API Server Endpoints
exports.endpoints = [

    { method: 'GET',  path: '/{somethingss*}', config: Static.get },
    { method: 'GET', path: '/searchDirectory/{param1*}', config: User.searchDirectory}
];