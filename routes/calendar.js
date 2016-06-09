var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');
var dataHandler = require('./modules/dataHandler');
var dateHandler = require('./modules/dateHandler');
var object = require('./modules/object');
var calculation = require('./modules/calculation');

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

router.get('/', function(req, res, next) {

	if (req.session && req.session.userId) {

		var userId = req.session.userId;

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

			// Get the calendar data
			fileHandling.read('./routes/data/dataTest.json')
			.then(function(response) {

				// get the calendarData
				var fullData = response;

				// Create the date of today
				var today = new Date();
				var thisMonth = today.getMonth();
				var currentMonthName = months[thisMonth];
				var thisYear = today.getFullYear();
				// Get the data from the current month
				var rightMonthData = fullData[0][thisYear][thisMonth + 1];

				// Ask for the users that are present on this month's day's
				dataHandler.getPresentDays(rightMonthData, userName)
				.then(function(response) {

					// Render the response data
					var customizedData = response;
					var firstDay = new Date(customizedData[1].fullDate).getDay()-1;
					if ( firstDay == 0 ) {
						firstDay = 6;
					} else {
						firstDay = firstDay-1;
					}

					var previousMonth = {};

					var a = 31;
					
					for ( var i = 0; i < firstDay; i++ ) {
						
						previousMonth[a] = {
							fullDate: thisYear + "-" + thisMonth + "-" + a,
							avalible: [],
							indication: 0,
							disabled: true
						}

						a--;

					}

					dataHandler.addColorCode(customizedData)
					.then(function(response) {

						var dataWithColor = response;

						var templateData = { name: userName, url: userImg, months: months, days: dataWithColor, currentMonth: currentMonthName, previousMonth: previousMonth };
						res.render('calendar', templateData);

					}).catch(function(res) {console.log("Error: ", res)});

				}).catch(function(res) {console.log("Error: ", res)});

			}).catch(function(res) {console.log("Error: ", res)});

		}).catch(function(res) {console.log("Error: ", res)});

	} else {
		res.redirect('/user/login');
	}

});


// Handle the post
router.post('/', function(req, res, err) {

	if (req.session && req.session.userId) {

		var userId = req.session.userId;
		var postData = req.body;

		// if there is no req.body --> set date --> How to get it!?

		fileHandling.read('./routes/data/users.json')
		.then(function(response) {
			user = response;

			// get the total amount of desks (for prototype purposes it's the amount of users * 1,5)
			var amountOfUsers = Math.round(Object.keys(user[0]).length * 1.5);

			for (var key in user[0]) {

				if ( user[0][key].id == userId ) {

					var userName = user[0][key].fullName;
					var userImg = user[0][key].url;

				}

			}
		  	
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
					var days = response; 
					 
					var newMonthData = days[0][yearToSet][monthToSet];

					dataHandler.getPresentDays(newMonthData, userName)
					.then(function(response) {

						var customizedData = response;
						var firstDay = new Date(customizedData[1].fullDate).getDay()-1;
						if ( firstDay == 0 ) {
							firstDay = 6;
						} else {
							firstDay = firstDay-1;
						}

						var previousMonth = {};

						var a = 31;
						
						for ( var i = 0; i < firstDay; i++ ) {
							
							previousMonth[a] = {
								fullDate: yearToSet + "-" + monthToSet - 1 + "-" + a,
								avalible: [],
								indication: 0,
								disabled: true
							}

							a--;

						}

						dataHandler.addColorCode(customizedData)
						.then(function(response) {

							var dataWithColor = response;

							var templateData = { name: userName, url: userImg, months: months, days: dataWithColor, currentMonth: currentMonthName, previousMonth: previousMonth };
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