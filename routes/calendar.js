var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');

router.get('/', function(req, res, next) {

	var months = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
	var days;
	var user;
	var templateData;

	// Get the user
	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		user = response;

		// Get the calendar data
		fileHandling.read('./routes/data/data.json')
		.then(function(response) {

			days = response;
			templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: days[0].mei };

			template.render(res, 'calendar', templateData);


		}).catch(function(res) {console.log("Error: ", res)});

	})
	.catch(function(res) {console.log("Error: ", res)});

});

module.exports = router;