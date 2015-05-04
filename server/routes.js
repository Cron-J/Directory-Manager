// Load modules

var User      = require('./controller/user'),
    Static    = require('./static');

// API Server Endpoints
exports.endpoints = [

    { method: 'GET',  path: '/{somethingss*}', config: Static.get },
    { method: 'GET', path: '/searchTenant/{header1}', config: User.getTenantUrl},
    { method: 'GET', path: '/searchTenant/{header1}/{id}', config: User.getTenantUrl},
    { method: 'GET', path: '/searchTenant/{header1}/{id}/{type}', config: User.getTenantUrl},
    { method: 'GET', path: '/searchTenant/{header1}/{id}/{type}/{file_name}', config: User.getTenantUrl},
    { method: 'GET', path: '/searchGlobal/{header2}', config: User.getGlobalUrl},
    { method: 'GET', path: '/searchGlobal/{header2}/{type}', config: User.getGlobalUrl},
    { method: 'GET', path: '/searchGlobal/{header2}/{type}/{file_name}', config: User.getGlobalUrl}
    // { method: 'GET', path: '/:type(discussion|page)', config:User.test}
];