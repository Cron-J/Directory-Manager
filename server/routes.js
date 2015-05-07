// Load modules

var User      = require('./controller/user'),
    Static    = require('./static');

// API Server Endpoints
exports.endpoints = [

    { method: 'GET',  path: '/{somethingss*}', config: Static.get },
    // { method: 'GET', path: '/searchTenant/{header}', config: User.getTenantUrl},
    // { method: 'GET', path: '/searchTenant/{header}/{id}', config: User.getTenantUrl},
    // { method: 'GET', path: '/searchTenant/{header}/{id}/{type}', config: User.getTenantUrl},
    // { method: 'GET', path: '/searchTenant/{header}/{id}/{type}/{file_name}', config: User.getTenantUrl},
    // { method: 'GET', path: '/searchGlobal/{header}', config: User.getGlobalUrl},
    // { method: 'GET', path: '/searchGlobal/{header}/{type}', config: User.getGlobalUrl},
    // { method: 'GET', path: '/searchGlobal/{header}/{type}/{file_name}', config: User.getGlobalUrl},

    //testing purpose
    { method: 'GET', path: '/searchDirectory/{param1}', config: User.searchDirectory},
    { method: 'GET', path: '/searchDirectory/{param1}/{param2}', config: User.searchDirectory},
    { method: 'GET', path: '/searchDirectory/{param1}/{param2}/{param3}', config: User.searchDirectory},
    { method: 'GET', path: '/searchDirectory/{param1}/{param2}/{param3}/{param4}', config: User.searchDirectory},
    { method: 'GET', path: '/searchDirectory/{param1}/{param2}/{param3}/{param4}/{param5}', config: User.searchDirectory}
];