var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');
var dataHandler = require('./modules/dataHandler');
var dateHandler = require('./modules/dateHandler');
var object = require('./modules/object');
var calculation = require('./modules/calculation');
var sessionHandling = require('./modules/sessionHandling');

// var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

router.get('/', function(req, res, next) {

	if (req.session && req.session.userId) {

		sessionHandling.checkUser(req.session)
		.then(function(response) {

			var userName = response.fullName;
			var userImg = response.url;

			// Get the calendar data
			fileHandling.read('./routes/data/dataTest.json')
			.then(function(response) {

				// get the calendarData
				var fullData = response;

				// Create the date of today
				var today = new Date();
				var thisDay = today.getDate();
				var thisMonth = today.getMonth() + 1;
				var currentMonthName = months[thisMonth - 1];
				var thisYear = today.getFullYear();

				// get the currentDay
				var currentDay = thisYear + "-" + thisMonth + "-" + thisDay;

				// Get the data from the current month
				var rightMonthData = fullData[0][thisYear][thisMonth];

				// Ask for the users that are present on this month's day's
				dataHandler.getPresentDays(rightMonthData, userName)
				.then(function(response) {

					// Render the response data
					var customizedData = response;

					// adding the previous month
					dataHandler.addPreviousMonth(customizedData, thisYear, thisMonth)
					.then(function(response) {

						var previousMonth = response;

						dataHandler.addColorCode(customizedData)
						.then(function(response) {

							var dataWithColor = response;

							// only send the before and after month
							var smallMonths = [];

							smallMonths.push(months[thisMonth-2]);
							smallMonths.push(months[thisMonth-1]);
							smallMonths.push(months[thisMonth]);

							var message;
							if ( req.query !== {} && req.query.first == "true" ) {
								message = "Select the day's you'll be working in the office.";
							}

							var templateData = { name: userName, url: userImg, months: smallMonths, days: dataWithColor, currentMonth: currentMonthName, previousMonth: previousMonth, message: message, currentDay: currentDay };
							res.render('calendar', templateData);

						}).catch(function(res) {console.log("Error: ", res)});

					}).catch(function(res) {console.log("Error: ", res)});

				}).catch(function(res) {console.log("Error: ", res)});

			}).catch(function(res) {console.log("Error: ", res)});

		})

	} else {

		res.redirect('/user/login');

	}

});


// Handle the post
router.post('/', function(req, res, err) {

	if (req.session && req.session.userId) {

		sessionHandling.checkUser(req.session)
		.then(function(response) {

			var userName = response.fullName;
			var userImg = response.url;
			var amountOfUsers = response.amount
			var postData = req.body;

		  	// Get the month and year that needs to be modified
		  	var firstPostItem = object.getFirst(postData);
		  	var yearToSet = firstPostItem.slice(0, 4);

		  	var sliceOne = firstPostItem.indexOf('-') + 1;
		  	var sliceTwo = firstPostItem.indexOf('-', sliceOne);

		  	var monthToSet = object.getFirst(postData).slice(sliceOne, sliceTwo);
		  	if ( monthToSet.charAt(0) == "0" ) {
		  		monthToSet = monthToSet.slice(1, 2);
		  	}
		  	var currentMonthName = months[monthToSet - 1];

			// Get the data
		  	fileHandling.read('./routes/data/dataTest.json')
			.then(function(response) {

				var days = response;
				var daysPresent = [];
				var recentlyAddedDays = [];

				// create a array with all the dates the user is going to work
				var rightMonthData = days[0][yearToSet][monthToSet];
				for (var key in postData) {

					var sliceDay = firstPostItem.indexOf('-', 5);
					var date = key.slice(sliceDay + 1, key.length);
					if ( date.charAt(0) == "0" ) {
						date = date.slice(1, 2);
					}
					daysPresent.push(date);

				}

				// loop thrue the whole months
				for (var key in rightMonthData) {

					var avaliblePersons = rightMonthData[key].avalible;

					// if the user is working on this day && that's not yet in the data --> add the user
					if ( daysPresent.indexOf(key) > -1 ) {

						// loop thure the avalible persons, if userName is not there, add it
						if ( avaliblePersons.indexOf(userName) == -1 ) {

			  				avaliblePersons.push(userName);
			  				recentlyAddedDays.push(key);

			  				rightMonthData[key].indication = calculation.newIndication(avaliblePersons.length, amountOfUsers);

			  			}

			  		// if the user isn't working on this day && is working in the data --> remover this person
					} else {

						// loop thure the avalible persons, if userName is there, remove it
						if ( avaliblePersons.indexOf(userName) > -1 ) {

							var indexNumber = avaliblePersons.indexOf(userName);
			  				avaliblePersons.splice(indexNumber);

			  				rightMonthData[key].indication = calculation.newIndication(avaliblePersons.length, amountOfUsers);

			  			}

					}

				}
				// rewrite the modified data to the dataset
				days[0][yearToSet][monthToSet] = rightMonthData;

				// write the new dataset
				fileHandling.write('./routes/data/dataTest.json', days)
				.then(function(response) {

					// the new dataset
					var responseDays = response;

					var newMonthData = responseDays[0][yearToSet][monthToSet];

					dataHandler.getPresentDays(newMonthData, userName)
					.then(function(response) {

						var customizedData = response;

						dataHandler.addPreviousMonth(customizedData, yearToSet, monthToSet)
						.then(function(response) {

							var previousMonth = response;

							recentlyAddedDays.forEach(function(day) {

								customizedData[day].class = "recently-added";

							});

							dataHandler.addColorCode(customizedData)
							.then(function(response) {

								var dataWithColor = response;

								// only send the before and after month
								var smallMonths = [];

								smallMonths.push(months[monthToSet-2]);
								smallMonths.push(months[monthToSet-1]);
								smallMonths.push(months[monthToSet]);

								var templateData = { name: userName, url: userImg, months: smallMonths, days: dataWithColor, currentMonth: currentMonthName, previousMonth: previousMonth };
								res.render('calendar', templateData);

							}).catch(function(res) {console.log("Error: ", res)});

						}).catch(function(res) {console.log("Error: ", res)});

					}).catch(function(res) {console.log("Error: ", res)});

				}).catch(function(res) {console.log("Error: ", res)});

			}).catch(function(res) {console.log("Error: ", res)});

		}).catch(function(res) {console.log("Error: ", res)});

	} else {
		res.redirect('/user/login');
	}

});

router.post('/singleData', function(req, res, err) {

	// check if there's a session
	if (req.session && req.session.userId) {

		// get the session data
		sessionHandling.checkUser(req.session)
		.then(function(response) {

			// set date
			var userName = response.fullName;
			var userImg = response.url;
			var amountOfUsers = response.amount
			var postData = req.body;

			// Make the month calculations
			var thisDate = Object.keys(postData);
			thisDate = thisDate[0];

			var yearToSet = thisDate.slice(0, 4);
			var sliceOne = thisDate.indexOf('-') + 1;
			var sliceTwo = thisDate.indexOf('-', sliceOne);
			var monthToSet = thisDate.slice(sliceOne, sliceTwo);
			if ( monthToSet.charAt(0) == "0" ) {
				monthToSet = monthToSet.slice(1, 2);
			}
			var dayToSet = thisDate.slice(sliceTwo + 1, thisDate.length);

			// get the data
		  	fileHandling.read('./routes/data/dataTest.json')
			.then(function(response) {

				var data = response;
				var theRightDay = data[0][yearToSet][monthToSet][dayToSet];

				// set or remove
				var status = postData[thisDate];
				var avaliblePersons = theRightDay.avalible;

				if ( status === "true" ) {

					theRightDay.avalible.push(userName);
					theRightDay.indication = calculation.newIndication(avaliblePersons.length, amountOfUsers);
					console.log(theRightDay.indication);
					// Recalculate color!!!

				}
				if ( status === "false" ) {
					console.log("FALSE");

					var indexNumber = theRightDay.avalible.indexOf(userName);
			  		theRightDay.avalible.splice(indexNumber);
					theRightDay.indication = calculation.newIndication(avaliblePersons.length, amountOfUsers);

				}

				data[0][yearToSet][monthToSet][dayToSet] = theRightDay;

				fileHandling.write('./routes/data/dataTest.json', data)
				.then(function(response) {

					res.send({postData: postData, indication: theRightDay.indication});

				}).catch(function(res) {console.log("Error: ", res)});

			}).catch(function(res) {console.log("Error: ", res)});



		}).catch(function(res) {console.log("Error: ", res)});

	} else {
		// res.redirect('/user/login');
	}

});

module.exports = router;
