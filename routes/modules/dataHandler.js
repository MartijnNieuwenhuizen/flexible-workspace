var dataHandler = {}

dataHandler.get = function(name, date) {

	// Get the user
	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		user = response;

		// Get the calendar data
		fileHandling.read('./routes/data/data.json')
		.then(function(response) {

			days = response;
			templateData = { name: user[0].martijn.fullName, url: user[0].martijn.url, months: months, days: days[0].mei };

			template.render(res, 'calendar', templateData);


		}).catch(function(res) {console.log("Error: ", res)});

	})
	.catch(function(res) {console.log("Error: ", res)});

}	

module.exports = dataHandler;