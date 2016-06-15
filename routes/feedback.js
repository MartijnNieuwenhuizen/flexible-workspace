var express = require('express');
var router = express.Router();

var fileHandling = require('./modules/fileHandling');
var sessionHandling = require('./modules/sessionHandling');

router.get('/', function(req, res, next) {

	if (req.session && req.session.userId) {

		sessionHandling.checkUser(req.session)
		.then(function(response) {

			var userName = response.fullName;
			var userImg = response.url;

			res.render('feedback', {name: userName, url: userImg});

		}).catch(function(res) {console.log("Error: ", res)});

	} else {
		res.redirect('/user/login');
	}

});

router.get('/show', function(req, res, next) {

	if (req.session && req.session.userId) {

		sessionHandling.checkUser(req.session)
		.then(function(response) {

			var userName = response.fullName;
			var userImg = response.url;

			if ( userName == "martijn" ) {

				fileHandling.read('./routes/data/feedback.json')
				.then(function(response) {

					var userFeedback = response;

					res.render('showFeedback', {name: userName, url: userImg, userFeedback: userFeedback[0]});

				}).catch(function(res) {console.log("Error: ", res)});

			} else {

				res.redirect('/user/login');

			}

		}).catch(function(res) {console.log("Error: ", res)});

	} else {
		res.redirect('/user/login');
	}

});

router.post('/', function(req, res) {

	if (req.session && req.session.userId) {

		sessionHandling.checkUser(req.session)
		.then(function(response) {

			var userName = response.fullName;
			var userImg = response.url;

			var titleData = req.body.title;
			var pageData = req.body.page;
			var feedbackData = req.body.feedback;

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
		res.redirect('/user/login');
	}

});

module.exports = router;