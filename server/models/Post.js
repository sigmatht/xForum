var	mongoose	=	require('mongoose');
var	Topic		=	require('../models/Topic.js');
var	User		=	require('../models/User.js');
var moment		=	require('moment');
var	Schema		=	mongoose.Schema;
var	ObjectId	=	Schema.ObjectId;

var	postSchema = new Schema({
	author: {type: ObjectId, ref: 'User'},
	topic: {type: ObjectId, ref: 'Topic'},
	body: String,
	postedOn: {type: String, default: moment().format()}
});

module.exports = mongoose.model('Post', postSchema);
