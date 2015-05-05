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
      
      file_path = '../server/Files' + path;
      fs.readdir(file_path, function (err, files) {
        if (err) {
            throw err;
        }
        else
        {
          info = {
            path: '/' + Path.basename(file_path),
            name: Path.basename(file_path)
          }; 
          if(path.extname(info.name))
          {
            info.type = "file";
          }
          else
          {
            info.type = "folder";
          }
          console.log("info",info);
          files.forEach(function (file) {
            console.log("xx",Path.extname(file));
          })    
        }  
      });
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

// function dirTree(filename) {
//   var stats = fs.lstatSync(filename),
//   info = {
//       path: '/' + Path.basename(filename),
//       name: Path.basename(filename)
//   };
//   if(stats.isDirectory()) {
//       info.type = "folder";
//       info.children = fs.readdirSync(filename).map(function(child) {
//           //structure(child, info);
//           child.path = '/'+ info.name + '/' + child;
//           child.name = child;
//           return child;
//           //return('/'+ info.name + '/' + child);
//       });
//   } 
//   else 
//   {
//     info.type = "file";
//   }
//   return info;
// };