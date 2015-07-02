var Joi = require('joi'),
    fs = require('fs'),
    Config = require('../config/config'),
    User = require('../model/user').User,
    Path = require('path')



exports.searchDirectory = {
  handler:function(request, reply) {
    var path = "";
    if(!isEmptyObject(request.params))
    {  
      var split = request.params.param1.split('/');
      console.log(split);
      for(var i=0;i<split.length;i++)
      {
        if(Config.map[split[i]] === undefined)
        {
          path += '/' + split[i];
        }
        else
        {
          path += '/' + Config.map[split[i]];
        }
      }
    }
    file_path = '../client/src/Files' + path;
    console.log("file_path",file_path);
    var result = dirTree(file_path, path, true);
    //if(request.params.param1)
    result.absurl = request.params.param1;
    // var index = {};
    // for(var val in result.children)
    // {
    //   if(result.children[val].name == request.query.user)
    //   {
    //     index.val = val;
    //   }

    // }
    // if(isEmptyObject(index))
    // {
    //   return reply(result);      
    // } 
    // else
    // {
    //   var finalOutput = result;
    //   for(var val in result.children)
    //   {
    //     if(val != index.val)
    //     {
    //       finalOutput.children.splice(val, 1);
    //     }
    //   }
      return reply(result);
    //}
  }  
};  


// function dirTree(filepath, orig_path, flag) {
//     var stats = fs.lstatSync(filepath),
//         info = {
//             path: filepath,
//         };

//     if (stats.isDirectory()) {
//         info.type = "folder";
//         info.children = fs.readdirSync(filepath).map(function(child) {
//             return dirTree(filepath + '/' + child);
//         });
//     } else {
//         // Assuming it's a file. In real life it could be a symlink or
//         // something else!
//         info.type = "file";
//     }
//     return info;
// }



function dirTree(filepath, orig_path, flag) {
  try
  {  
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
  }
  catch(e) {
    return("Invalid Path")
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
};

function getKeyByValue(obj, value ) {
  for( var prop in obj ) {
    if( obj.hasOwnProperty( prop ) ) {
      if( obj[ prop ] === value )
        return prop;
    }
  }
};

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}