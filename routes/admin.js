var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var dataHandler = require('./modules/dataHandler');
var createNewCalendar = require('./modules/createNewCalendar');

router.get('/', function(req, res, next) {

	// get all data
	fileHandling.read('./routes/data/dataTest.json')
	.then(function(response) {

		var years = response;

		// filter the years
		dataHandler.getCurrentYears(years)
		.then(function(response) {

			years = response;

			// render the template
			res.render('admin', { title: 'admin', years: years });

		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});

});

router.post('/', function(req, res, next) {

	var newAddedYear = req.body.year;
	createNewCalendar.set(newAddedYear, res)
	.then(function(response) {

	})

});

module.exports = router;