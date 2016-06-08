var fileHandling = require('./fileHandling');
var dataHandler = require('./dataHandler');

var createNewCalendar = {};

createNewCalendar.set = function(year, res) {

	return new Promise(function(resolve, reject) {

		var _year = year;
		var _res = res;

		// check if the year already exists
		fileHandling.read('./routes/data/dataTest.json')
		.then(function(response) {

			var data = response;

			// check if the year already exists in the data
			if ( !data[0][year] ) {
				
				// Create the data of the entire year and add it to the calendar
				createNewCalendar.setAllDates(year)
				.then(function(response) {

					// add the generated calendar to the dataset
					data[0][year] = response[year];

					// write the new dataset
					fileHandling.write('./routes/data/dataTest.json', data)
					.then(function(response) {

						var newData = response;

						dataHandler.getCurrentYears(newData)
						.then(function(response) {

							var years = response;
							var message = _year + " is added";

							// render the template
							_res.render('admin', { title: 'admin', years: years, message: message });

						}).catch(function(res) {console.log("Error: ", res)});

					}).catch(function(res) {console.log("Error: ", res)});


				});

			} else {

				dataHandler.getCurrentYears(data)
				.then(function(response) {

					var years = response;
					var message = _year + " already exisit";

					// render the template
					_res.render('admin', { title: 'admin', years: years, message: message });

				}).catch(function(res) {console.log("Error: ", res)});

			}


		}).catch(function(res) {console.log("Error: ", res)});

	});

}

createNewCalendar.setAllDates = function(year) {

	return new Promise(function(resolve, reject) {

		var _year = year;

		// The now empty Calendar
		var fullCalendar = {};

		// All the years I want to create
		var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		// Calendar Object

		// add the years a object to the calendar object
		fullCalendar[_year] = {};

		// Loop thrue the months in that year
		months.forEach(function(month) {

			fullCalendar[_year][month] = {};

			// get the days in this month
			createNewCalendar.getDaysInMonth(month, _year, fullCalendar)
			.then(function(response) {
				resolve(response);
			})

		});

		resolve(fullCalendar);

	});
	
}

createNewCalendar.getDaysInMonth = function(month, year, fullCalendar) {

	return new Promise(function(resolve, reject) {

		var _month = month - 1;
		var _year = year;
		var _fullCalendar = fullCalendar;

	    var date = new Date(_year, _month, 1);
	    // Loop thure the days in this month
	    // Thx Juan Mendes for this bit of code!
	    // Source: http://stackoverflow.com/questions/13146418/find-all-the-days-in-a-month-with-date-object
	    while (date.getMonth() === _month) {

	    	// Create a new day
	    	var day = new Date(date).getDate();
	        // Create the calendar object
	        createNewCalendar.createCalendarObject(year, month, day, fullCalendar)
	        .then(function(response) {
	        	resolve(response);
	        })
	        // Loop the next day
	        date.setDate(date.getDate() + 1);
	    }

	});
	
}

createNewCalendar.createCalendarObject = function(year, month, day, fullCalendar) {

	return new Promise(function(resolve, reject) {

		var _year = year;
		var _month = month;
		var _day = day;
		var _fullCalendar = fullCalendar;

		// add all the items to the calendar
		_fullCalendar[_year][_month][_day] = {
			fullDate: _year + "-" + _month + "-" + _day,
			avalible: [],
			indication: 0
		};

		resolve(_fullCalendar);

	});
	
}

module.exports = createNewCalendar;