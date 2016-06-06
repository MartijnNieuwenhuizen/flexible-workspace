var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');
var dataHandler = require('./modules/dataHandler');
var object = require('./modules/object');

var months = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

// Get the data
fileHandling.read('./routes/data/dataTest.json')
.then(function(response) {

	// get the calendarData
	var fullData = response;

	// get this year
	var thisYear = new Date().getFullYear();
	
	for (var key in fullData[0][thisYear]) {

		var monthName = months[key - 1];
		var monthPath = "/" + monthName;

		router.get(monthPath, function(req, res, next) {

			fileHandling.read('./routes/data/users.json')
			.then(function(response) {
				user = response;

				var rightMonthData = fullData[0][thisYear][key];
				var userName = "martijn";

				dataHandler.getPresentDays(rightMonthData, userName)
				.then(function(response) {

					console.log(key);
					var customizedData = response;
					var templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: customizedData, currentMonth: monthName };
					
					template.render(res, 'calendar', templateData);

				}).catch(function(res) {console.log("Error: ", res)});

			}).catch(function(res) {console.log("Error: ", res)});

		});

	}

}).catch(function(res) {console.log("Error: ", res)});

	
module.exports = router;