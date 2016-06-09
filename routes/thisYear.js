var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');
var dataHandler = require('./modules/dataHandler');
var object = require('./modules/object');

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

router.get('/:month', function(req, res, next) {

	if (req.session && req.session.userId) {

		var userId = req.session.userId;
		var monthName = req.params.month;
		var monthNumber = months.indexOf(monthName) + 1;

		// Get the user
		fileHandling.read('./routes/data/users.json')
		.then(function(response) {
			var user = response;

			for (var key in user[0]) {

				if ( user[0][key].id == userId ) {

					var userName = user[0][key].fullName;
					var userImg = user[0][key].url;

				}

			}

			var monthNumber = months.indexOf(monthName) + 1;
			var thisYear = new Date().getFullYear();

			fileHandling.read('./routes/data/dataTest.json')
			.then(function(response) {

				// get the calendarData
				var fullData = response;
				var rightMonthData = fullData[0][thisYear][monthNumber];

				dataHandler.getPresentDays(rightMonthData, userName)
				.then(function(response) {

					var customizedData = response;
					var firstDay = new Date(customizedData[1].fullDate).getDay();
					if ( firstDay == 0 ) {
						firstDay = 6;
					} else {
						firstDay = firstDay-1;
					}

					console.log(firstDay);

					var previousMonth = {};

					var a = 31;
					
					for ( var i = 0; i < firstDay; i++ ) {
						
						previousMonth[a] = {
							fullDate: thisYear + "-" + monthNumber - 1 + "-" + a,
							avalible: [],
							indication: 0,
							disabled: true
						}

						a--;

					}

					dataHandler.addColorCode(customizedData)
					.then(function(response) {

						var dataWithColor = response;

						var templateData = { name: userName, url: userImg, months: months, days: dataWithColor, currentMonth: monthName, previousMonth: previousMonth };
						res.render('calendar', templateData);

					}).catch(function(res) {console.log("Error: ", res)});

				}).catch(function(res) {console.log("Error: ", res)});

			}).catch(function(res) {console.log("Error: ", res)});

		}).catch(function(res) {console.log("Error: ", res)});

	} else {
		res.redirect('/user/login');
	}
});

	
module.exports = router;