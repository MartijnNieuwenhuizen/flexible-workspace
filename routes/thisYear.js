var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');
var dataHandler = require('./modules/dataHandler');
var object = require('./modules/object');
var sessionHandling = require('./modules/sessionHandling');

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

router.get('/:month', function(req, res, next) {

	if (req.session && req.session.userId) {

		sessionHandling.checkUser(req.session)
		.then(function(response) {

			var userName = response.fullName;
			var userImg = response.url;

			var monthName = req.params.month;
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
					
					dataHandler.addPreviousMonth(customizedData, thisYear, monthNumber)
					.then(function(response) {

						var previousMonth = response;

						dataHandler.addColorCode(customizedData)
						.then(function(response) {

							var dataWithColor = response;

							// only send the before and after month
								var smallMonths = [];

								smallMonths.push(months[monthNumber-2]);
								smallMonths.push(months[monthNumber-1]);
								smallMonths.push(months[monthNumber]);

							var templateData = { name: userName, url: userImg, months: smallMonths, days: dataWithColor, currentMonth: monthName, previousMonth: previousMonth };
							res.render('calendar', templateData);

						}).catch(function(res) {console.log("Error: ", res)});
						
					}).catch(function(res) {console.log("Error: ", res)});

				}).catch(function(res) {console.log("Error: ", res)});

			}).catch(function(res) {console.log("Error: ", res)});

		}).catch(function(res) {console.log("Error: ", res)});

	} else {
		res.redirect('/user/login');
	}

});

	
module.exports = router;