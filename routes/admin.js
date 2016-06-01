var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var dataHandler = require('./modules/dataHandler');

router.get('/', function(req, res, next) {

	// get all current set years
	fileHandling.read('./routes/data/data.json')
	.then(function(response) {

		var years = response;

		// ToDo:
			// get the years in the data object
			// on a post, add this new year if it's exists
			// remove the dummydata
			// get started with the new data :)


		dataHandler.getCurrentYears(years)
		.then(function(response) {

			years = response;
			res.render('admin', { title: 'admin', years: years });

		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});

});

module.exports = router;