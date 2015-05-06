// Load modules

var User      = require('./controller/user'),
    Static    = require('./static');

// API Server Endpoints
exports.endpoints = [

    { method: 'GET',  path: '/{somethingss*}', config: Static.get },
    { method: 'GET', path: '/searchTenant/{header}', config: User.getTenantUrl},
    { method: 'GET', path: '/searchTenant/{header}/{id}', config: User.getTenantUrl},
    { method: 'GET', path: '/searchTenant/{header}/{id}/{type}', config: User.getTenantUrl},
    { method: 'GET', path: '/searchTenant/{header}/{id}/{type}/{file_name}', config: User.getTenantUrl},
    { method: 'GET', path: '/searchGlobal/{header}', config: User.getGlobalUrl},
    { method: 'GET', path: '/searchGlobal/{header}/{type}', config: User.getGlobalUrl},
    { method: 'GET', path: '/searchGlobal/{header}/{type}/{file_name}', config: User.getGlobalUrl}
];