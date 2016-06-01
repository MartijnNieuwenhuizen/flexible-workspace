var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var dataHandler = require('./modules/dataHandler');

router.get('/', function(req, res, next) {

	// get all current set years
	fileHandling.read('./routes/data/data.json')
	.then(function(response) {

		var years = response;
		dataHandler.getCurrentYears(years)
		.then(function(response) {

			years = response;
			res.render('admin', { title: 'admin', years: years });

		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});

});

module.exports = router;