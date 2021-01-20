var mongoose = require('mongoose');

var batismoSchema = new mongoose.Schema({
	date: String,
	pai: String,
	mae: String,
	title: String,
	_id: String,
	ref: String,
	href: String
});

module.exports = mongoose.model('batismo', batismoSchema);
