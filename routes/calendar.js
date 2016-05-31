var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var template = require('./modules/template');
var dataHandler = require('./modules/dataHandler');
var object = require('./modules/object');

var months = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

router.get('/', function(req, res, next) {

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
			var rightMonthData = days[0].jun; // set this right!
			var userName = "martijn";

			// set user to present
			for (var key in rightMonthData) {

				// loop thure the avalible persons, if userName is not there, add it
				var avaliblePersons = rightMonthData[key].avalible;
				// console.log(avaliblePersons);
				if ( avaliblePersons.indexOf(userName) > -1 ) {

					rightMonthData[key].present = true;
					
	  			}
		  	}

		  	// console.log(rightMonthData);

			templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: rightMonthData};

			template.render(res, 'calendar', templateData);


		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});

});


// Handle the post
router.post('/sendCalendar', function(req, res, err) {

  	var postData = req.body;
  	// Get the month that needs to me modified

  	var monthToSet = object.getFirst(postData).slice(5, 7);
  	if ( monthToSet.charAt(0) == "0" ) {
  		monthToSet = monthToSet.slice(1, 2);
  	}
  	monthToSet = monthToSet -1;
  	var monthName = months[monthToSet];

  	var days;

  	var userName = "martijn"; // get this form server or client

  	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		user = response;

	  	fileHandling.read('./routes/data/data.json')
		.then(function(response) {

			var daysPresent = [];

			days = response;

			// create a array with all the dates the user is going to work
			var rightMonthData = days[0][monthName];
			for (var key in postData) {

				var date = key.slice(8, 10);
				if ( date.charAt(0) == "0" ) {
					date = date.slice(1, 2);
				}
				daysPresent.push(date);

			}

			// loop thrue the whole months
			for (var key in rightMonthData) {

				// if the user is working on this day && that's not yet in the data --> add the user
				if ( daysPresent.indexOf(key) > -1 ) {

					// loop thure the avalible persons, if userName is not there, add it
					var avaliblePersons = rightMonthData[key].avalible;
					if ( avaliblePersons.indexOf(userName) == -1 ) {

		  				avaliblePersons.push(userName)

		  			}

		  		// if the user isn't working on this day && is working in the data --> remover this person
				} else {
					
					// loop thure the avalible persons, if userName is there, remove it
					var avaliblePersons = rightMonthData[key].avalible;
					if ( avaliblePersons.indexOf(userName) > -1 ) {

						var indexNumber = avaliblePersons.indexOf(userName);
		  				avaliblePersons.splice(indexNumber);

		  			}

				}

			}
			days[0][monthName] = rightMonthData;

			fileHandling.write('./routes/data/data.json', days)
			.then(function(response) {

				var days = response;
				var rightMonthData = days[0].jun; // set this right!
				var userName = "martijn";

				// set user to present
				for (var key in rightMonthData) {

					// loop thure the avalible persons, if userName is not there, add it
					var avaliblePersons = rightMonthData[key].avalible;
					// console.log(avaliblePersons);
					if ( avaliblePersons.indexOf(userName) > -1 ) {

						rightMonthData[key].present = true;

		  			}
			  	}

				templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: rightMonthData};

				template.render(res, 'calendar', templateData);

			}).catch(function(res) {console.log("Error: ", res)});


		}).catch(function(res) {console.log("Error: ", res)});

	}).catch(function(res) {console.log("Error: ", res)});
  
});

module.exports = router;



