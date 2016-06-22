var dataHandler = {}

dataHandler.get = function(name, date) {

	// Get the user
	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		user = response;

		fileHandling.read('./routes/data/data.json')
		.then(function(response) {

			days = response;
			templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: days[0].mei };

			template.render(res, 'calendar', templateData);


		}).catch(function(res) {console.log("Error: ", res)});

	})
	.catch(function(res) {console.log("Error: ", res)});

}	

dataHandler.getPresentDays = function(data, userName) {

	return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

		var _data = data;
		var _userName = userName;

		// set user to present
		for (var key in _data) {

			// loop thure the avalible persons, if userName is not there, add it
			var avaliblePersons = _data[key].avalible;
			if ( avaliblePersons.indexOf(_userName) > -1 ) {

				_data[key].present = true;
				
			}
		}
		resolve(_data);

	});

}

dataHandler.getCurrentYears = function(_data) {

	return new Promise(function(resolve, reject) {

		var years = [];

		for (var key in _data[0]) {

			years.push(key);

		}

		resolve(years);

	});

}

dataHandler.addColorCode = function(data) {

	return new Promise(function(resolve, reject) {

		var _data = data;

		// add the color to the indication value
		for (var key in _data) {

			if ( _data[key].indication < 25 ) {
				_data[key].color = "#96C550";
			} else if ( _data[key].indication < 50 ) {
				_data[key].color = "#00AD35";
			} else if ( _data[key].indication < 75 ) {
				_data[key].color = "#F25336";
			} else {
				_data[key].color = "#C90702";
			}

		}

		resolve(_data);

	});

}

dataHandler.addPreviousMonth = function(data, year, month) {

	return new Promise(function(resolve, reject) {

		var _data = data;
		var _year = year;
		var _month = month

		var previousMonth = {};
		var a = 31;
		var firstDay = new Date(_data[1].fullDate).getDay();

		if ( firstDay == 0 ) {
			firstDay = 6;
		} else {
			firstDay = firstDay-1;
		}
		
		for ( var i = 0; i < firstDay; i++ ) {
			
			previousMonth[a] = {
				fullDate: _year + "-" + _month + "-" + a,
				avalible: [],
				indication: 0,
				disabled: true
			}

			a--;

		}

		resolve(previousMonth);

	});

}

module.exports = dataHandler;