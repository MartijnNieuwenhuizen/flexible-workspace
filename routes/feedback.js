var express = require('express');
var router = express.Router();

var fileHandling = require('./modules/fileHandling');

router.get('/', function(req, res, next) {

	if (req.session && req.session.userId) {

		var userId = req.session.userId;
		var titleData = req.body.title;
		var pageData = req.body.page;
		var feedbackData = req.body.feedback;

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

			res.render('feedback', {name: userName, url: userImg});

		}).catch(function(res) {console.log("Error: ", res)});
	
	} else {
		res.redirect('/user/login');
	}

});

router.post('/', function(req, res) {

	if (req.session && req.session.userId) {

		var userId = req.session.userId;
		var titleData = req.body.title;
		var pageData = req.body.page;
		var feedbackData = req.body.feedback;

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

			var now = new Date();
			var timeStamp = now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate() + "-" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

			// get the feedback.json
			fileHandling.read('./routes/data/feedback.json')
			.then(function(response) {

				var feedbackJSON = response;
				// add the new feedback 
				feedbackJSON[0][timeStamp] = {
					title: titleData,
					page: pageData,
					feedback: feedbackData,
					user: userName,
					date: timeStamp
				}

				// write the new feedback.json
				fileHandling.write('./routes/data/feedback.json', feedbackJSON)
				.then(function(response) {

					// render thx for the feedback page!
					res.render('feedback', {name: userName, url: userImg, message: "Thanks for your feedback."});

				}).catch(function(res) {console.log("Error: ", res)});

			}).catch(function(res) {console.log("Error: ", res)});

		}).catch(function(res) {console.log("Error: ", res)});

	} else {

	}

});

module.exports = router;