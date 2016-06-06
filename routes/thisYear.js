var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');
var dataHandler = require('./modules/dataHandler');
var object = require('./modules/object');

var months = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

router.get('/:month', function(req, res, next) {

	var monthName = req.params.month;
	var monthNumber = months.indexOf(monthName) + 1;
	console.log(monthNumber);
	var thisYear = new Date().getFullYear();

	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		user = response;

		fileHandling.read('./routes/data/dataTest.json')
		.then(function(response) {

			// get the calendarData
			var fullData = response;
			var rightMonthData = fullData[0][thisYear][4];
			var userName = "martijn";

			dataHandler.getPresentDays(rightMonthData, userName)
			.then(function(response) {

				var customizedData = response;
				var templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: customizedData, currentMonth: monthName };
				
				template.render(res, 'calendar', templateData);

			}).catch(function(res) {console.log("Error: ", res)});

		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});

});

	
module.exports = router;