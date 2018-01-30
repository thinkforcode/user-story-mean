var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bycrypt = require('bycrypt-nodejs')

var Userschema = new Schema({
	name:String,
	username:{type:String,required:true, index:{unique:true}},
	password:{type:String,required:true,select:false}
});


module.exports = mongoose.model('User' , Userschema);

