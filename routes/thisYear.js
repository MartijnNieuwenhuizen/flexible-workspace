var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');
var dataHandler = require('./modules/dataHandler');
var object = require('./modules/object');

var months = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

router.get('/mei', function(req, res, next) {

	var month = "mei";

	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		user = response;

		// Get the calendar data
		fileHandling.read('./routes/data/data.json')
		.then(function(response) {

			days = response;
			var rightMonthData = days[0][month]; // set this right!
			var userName = "martijn";

			dataHandler.getPresentDays(rightMonthData, userName)
			.then(function(response) {

				var customizedData = response;
				var templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: customizedData, currentMonth: month };
				
				template.render(res, 'calendar', templateData);

			}).catch(function(res) {console.log("Error: ", res)});


		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});

});

router.get('/jun', function(req, res, next) {

	var month = "jun";

	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		user = response;

		// Get the calendar data
		fileHandling.read('./routes/data/data.json')
		.then(function(response) {

			days = response;
			var rightMonthData = days[0][month]; // set this right!
			var userName = "martijn";

			dataHandler.getPresentDays(rightMonthData, userName)
			.then(function(response) {

				var customizedData = response;
				var templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: customizedData, currentMonth: month };
				
				template.render(res, 'calendar', templateData);

			}).catch(function(res) {console.log("Error: ", res)});


		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});

});

router.get('/jul', function(req, res, next) {

	var month = "jul";

	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		user = response;

		// Get the calendar data
		fileHandling.read('./routes/data/data.json')
		.then(function(response) {

			days = response;
			var rightMonthData = days[0][month]; // set this right!
			var userName = "martijn";

			dataHandler.getPresentDays(rightMonthData, userName)
			.then(function(response) {

				var customizedData = response;
				var templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: customizedData, currentMonth: month };
				
				template.render(res, 'calendar', templateData);

			}).catch(function(res) {console.log("Error: ", res)});


		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});

});
	
module.exports = router;