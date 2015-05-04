var Joi = require('joi'),
    fs = require('fs'),
    Config = require('../config/config');
    User = require('../model/user').User;

exports.upload = {
  validate: {
        payload: {

            output      :'stream',
            parse       : false,
            allow       : 'multipart/form-data',
            upload_file : Joi.object().required(),
            file_name   : Joi.string().required()
        }
  },
  handler: function (request, reply) {
    var upload_path = '../client/src/uploads/'+ request.payload.file_name;
    fs.writeFileSync(upload_path, request.payload['upload_file']);
    var user = new User({file_name : request.payload.file_name});
    user.save(function(err, user) {
      if (err) return reply(err);
      return reply("File uploaded succesfully");
    });
  }
};

exports.getTenantUrl = {
  handler:function(request, reply) {
    var path = "";
    if(request.params.header1)
    {
      path = '/' + Config.map[request.params.header1]; 
      if(request.params.id)
      {
        path += '/' + request.params.id;
        if(request.params.type)
        {
          path += '/' + Config.map[request.params.type]
          if(request.params.file_name)
          {
            path += '/'+ request.params.file_name;
          }  
        }  
      }  
      return reply(path);
    }  
  }
};

exports.getGlobalUrl = {
  handler: function(request, reply) {
    var path = "";
    if(request.params.header2)
    {
      path = '/' + Config.map[request.params.header2];
      if(request.params.type)
      {
        path += '/' + Config.map[request.params.type]
        if(request.params.file_name)
        {
          path += '/'+ request.params.file_name;
        }  
      }
      return reply(path);
    }  
  }
};