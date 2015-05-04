var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
  * @module  User
  * @description contain the details of Attribute  
*/

var UserSchema = new Schema({
  
  file_name : { type: String, required: true}

});

var user = mongoose.model('user', UserSchema);

/** export schema */
module.exports = {
    User : user
};