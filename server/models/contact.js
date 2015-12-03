//import mongoose and bcrypt
var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Schema
var ContactSchema = new Schema({
	name: String,
	tel: String,
	email: String,
	address: String	
}, 
{
	collection: 'ContactInfo'
});

module.exports = mongoose.model('CONTACT', ContactSchema);