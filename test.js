var assert = require('assert');
var app = require('./app');
var Model = app.Model;
var dao = app.dao;

describe('app.dao', function () {
	it('should find document', function (done) {
		var id = null;

		(new Model({
			num: 1,
			str: 'testtest'
		})).save(function (error, result) {
			assert.ok(!error);
			assert.ok(result);
			id = '' + result._id;

			dao.findById(id, function (error, document) {
				assert.ok(!error);
				assert.strictEqual(document.num, 1);
				assert.strictEqual(document.str, 'testtest');
				done();
			});
		});

		after(function (done) {
			Model.remove({_id: id}, done);
		});
	});
});
