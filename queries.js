var promise = require('bluebird');

var options = {
	// Initialization Options
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/kittens';
var db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'kittens',
	user: 'postgres',
	password: 'hello'
});

// Add query functions
function getAllKittens(req, res, next) {
	db.any('select * from kits').then(function(data) {
		res.status(200).json({
			status: 'success',
			data: data,
			message: 'Retrieved ALL kittens'
		});
	}).catch(function (err) {
		return next(err);
	});
};

function getSingleKitten(req, res, next) {
	var kitID = parseInt(req.params.id);
	db.one('select * from kits where id = $1', kitID).then(function (data) {
		res.status(200).json({
			status: 'success',
			data: data,
			message: 'Retrieved ONE kitten'
		});
	}).catch(function (err) {
		return next(err);
	});
};

function createKitten(req, res, next){
	req.body.age = parseInt(req.body.age);
	db.none('insert into kits(name, breed, age, sex)' + 'values(${name}, ${breed}, ${age}, ${sex})', req.body).then(function() {
		res.status(200).json({
			status: 'success',
			message: 'Inserted one kitten'
		});
	}).catch(function(err) {
		return next(err);
	});
};

function updateKitten(req, res, next) {
	db.none('update kits set name=$1, breed=$2, age=$3, sex=$4 where id=$5', [req.body.name, req.body.breed, parseInt(req.body.age), req.body.sex, parseInt(req.params.id)]).then(function() {
		res.status(200).json({
			status: 'success',
			message: 'Updated kitten'
		});
	}).catch(function(err) {
		return next(err);
	});
};

function removeKitten(req, res, next) {
	var kitID = parseInt(req.params.id);
	db.result('delete from kits where id = $1', kitID).then(function(result) {
		res.status(200).json({
			status: 'success',
			message: `Removed ${result.rowCount} kitten`
		});
	}).catch(function(err) {
		return next(err);
	});
};

module.exports = {
	getAllKittens: getAllKittens,
	getSingleKitten: getSingleKitten,
	createKitten: createKitten,
	updateKitten: updateKitten,
	removeKitten: removeKitten
};
