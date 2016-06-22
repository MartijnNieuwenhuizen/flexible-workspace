var fileHandling = require('./fileHandling');

var sessionHandling = {};

sessionHandling.checkUser = function(session) {

	return new Promise(function(resolve, reject) {

		var userId = session.userId;

		// Get the user
		fileHandling.read('./routes/data/users.json')
		.then(function(response) {
			var user = response;
			var sendUser = {};

			var amountOfUsers = Math.round(Object.keys(user[0]).length);

			for (var key in user[0]) {

				if ( user[0][key].id == userId ) {

					sendUser.fullName = user[0][key].fullName;
					sendUser.url = user[0][key].url;
					sendUser.desk = user[0][key].desk;
					sendUser.allUsers = user;
					sendUser.amount = amountOfUsers;

				}

			}

			resolve(sendUser);

		}).catch(function(res) {console.log("Error: ", res)});

	});

}

module.exports = sessionHandling;