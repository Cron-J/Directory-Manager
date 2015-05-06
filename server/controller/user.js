var Joi = require('joi'),
    fs = require('fs'),
    Config = require('../config/config'),
    User = require('../model/user').User,
    Path = require('path')

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
    if(request.params.header)
    {
      path = '/' + Config.map[request.params.header]; 
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
      file_path = '../server/Files' + path;
      var result = dirTree(file_path, path, true);
       return reply(result);
    }  
  }
};


function dirTree(filepath, orig_path, flag) {
    console.log("orig_path",orig_path);
    var stats = fs.lstatSync(filepath),
    info = {
        path: filepath,
        name: Path.basename(filepath)
    };
    var user_path = makeUserPath(orig_path)
    if(user_path) {
      info.user_path = user_path;
    }
    if (stats.isDirectory()) {
        info.type = "folder";
        if(flag)
        {
          info.children = fs.readdirSync(filepath).map(function(child) {
            return dirTree(filepath + '/' + child, orig_path + '/'+ child, false);
          });
        }  
    } 
    else 
    {
        info.type = "file";
    }
    return info;
}

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
      return reply(path)
    }  
  }
};

function getKeyByValue(obj, value ) {
  for( var prop in obj ) {
    if( obj.hasOwnProperty( prop ) ) {
      if( obj[ prop ] === value )
        return prop;
    }
  }
};

function makeUserPath(path) {
  var split = path.split("/");
  var new_path = ""; 
    for(var i=0;i<split.length;i++)
    {
      if(split[i])
      {
        var map_value = getKeyByValue(Config.map, split[i]);
        if(map_value)
        {
          new_path += "/" + map_value;
        }
        else
        {
          new_path += "/" + split[i];
        }  
      }  
    }
    return new_path;
}