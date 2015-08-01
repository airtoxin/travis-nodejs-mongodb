var mongoose = require('mongoose');
var config = require('config');
var _ = require('lodash');

// connect to mongo
var dsn = '';
_.each(config.mongo.servers, function (server) {
	if (dsn !== '') dsn += ',';
	dsn += 'mongodb://' + server.user + ':' + server.pswd + '@' + server.host + ':' + server.port + '/' + config.mongo.name;
});
if (config.mongo.rs_name) dsn += '?replicaSet=' + config.mongo.rs_name;
mongoose.connect(dsn, {
	server: {
		auto_reconnect: true
	}
});

var Model = mongoose.model('TestModel', new mongoose.Schema({
	num: {type: Number},
	str: {type: String}
}));

var dao = {
	findById: function (id, callback) {
		Model.findById({_id: id}).lean().exec(function (error, document) {
			callback(error, document);
		});
	}
};

module.exports = {
	Model: Model,
	dao: dao
};
