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

exports.searchDirectory = {
  handler:function(request, reply) {
    var path = "";
    var split = request.params.param1.split('/');
    for(var i=0;i<split.length;i++)
    {
      if(Config.map[split[i]])
      {
        path += '/' + Config.map[split[i]]; 
      }
      else
      {
        path += '/' + split[i];
      }

    }
    file_path = '../server/Files' + path;
    var result = dirTree(file_path, path, true);
    return reply(result);      
  }
};  

function dirTree(filepath, orig_path, flag) {
    var stats = fs.lstatSync(filepath),
    info = {
        path: filepath
    };
    var file_nm = Path.basename(filepath);
    var keyValue = getKeyByValue(Config.map,file_nm)
    if(keyValue)
    {
      info.name = keyValue;
    }
    else
    {
      info.name = file_nm;
    }  
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
};

function getKeyByValue(obj, value ) {
  for( var prop in obj ) {
    if( obj.hasOwnProperty( prop ) ) {
      if( obj[ prop ] === value )
        return prop;
    }
  }
};