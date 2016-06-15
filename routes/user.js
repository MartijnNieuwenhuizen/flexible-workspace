var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var sessionHandling = require('./modules/sessionHandling');

router.get('/login', function(req, res, next) {
  
	res.render('login');

});

router.post('/login', function(req, res, next) {

  	// the name filled in by the user
	var inputName = req.body.username.toLowerCase();

	// get the users DB
	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		
		var users = response;
		
		// if the users exists in the DB
		if ( users[0][inputName] ) {
			
			// create Session
			var sess = req.session;
			sess.views = 1;
			sess.userId = users[0][inputName].id;
			
			// rederect the user to the calendar
			res.redirect('/?first=true');

		} else {
			
			// render sign up page
			res.redirect('sign-up/' + inputName);

		}

	}).catch(function(res) {console.log("Error: ", res)});

});



router.get('/sign-up/:name', function(req, res, next) {
  		
  	var name = "username";
  	var name = req.params.name;
	res.render('sign-up', {name: name});

});

router.post('/sign-up', function(req, res, next) {
  
	var username = req.body.username.toLowerCase();
	var desk = req.body.desk;
	var email = req.body.email;

	fileHandling.read('./routes/data/users.json')
	.then(function(response) {
		
		var users = response;
		
		// if the users exists in the DB
		if ( users[0][username] ) {
			
			// User already exists!!!!!!
			// Log the user in!

		} else {
			
			// add the new user
			users[0][username] = {
				fullName: username,
				desk: desk,
				url: '/img/avatar.gif',
				id: Object.keys(users[0]).length + 1,
				email: false
			};

			if ( email == "on" ) {
				users[0][username].email = true
			}

			var sess = req.session;
			sess.views = 1;
			sess.userId = users[0][username].id;
			
			// write the new userdata
			fileHandling.write('./routes/data/users.json', users)
			.then(function(response) {

				var newUserData = response;
				res.redirect('/?first=true');

			}).catch(function(res) {console.log("Error: ", res)});

		}


	}).catch(function(res) {console.log("Error: ", res)});


});



router.get('/:name', function(req, res, next) {

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
					var userDesk = user[0][key].desk;

				}

			}

			res.render('user', {name: userName, url: userImg, desk: userDesk});

		}).catch(function(res) {console.log("Error: ", res)});

	} else {

		res.redirect('/user/login');

	}

});

router.post('/change-desk', function(req, res, next) {

	if (req.session && req.session.userId) {

		var userId = req.session.userId;
		var newDeskType = req.body.desk;

		// Get the user
		fileHandling.read('./routes/data/users.json')
		.then(function(response) {
			var user = response;

			for (var key in user[0]) {

				if ( user[0][key].id == userId ) {

					var userName = user[0][key].fullName;
					var userImg = user[0][key].url;
					var userDesk = user[0][key].desk;
					var userKey = key;

				}

			}

			var message = "Desk type changed";

			if ( newDeskType == userDesk ) {

				message = "You already selected the" + newDeskType + "desk";
				res.render('user', {name: userName, url: userImg, desk: userDesk, message: message});

			} else {

				// get right user
				user[0][userKey].desk = newDeskType;
				fileHandling.write('./routes/data/users.json', user)
				.then(function(response) {

					var newUserData = response;
					
					userName = newUserData[0][userKey].fullName;
					userImg = newUserData[0][userKey].url;
					userDesk = newUserData[0][userKey].desk;

					res.render('user', {name: userName, url: userImg, desk: userDesk, message: message});				

				})

			}


			

		}).catch(function(res) {console.log("Error: ", res)});

	} else {

		res.redirect('/user/login');

	}

});

router.post('/logout', function(req, res, next) {

	if (req.session && req.session.userId) {

		req.session.destroy()
		res.redirect('/user/login');

	} else  {

		res.redirect('/user/login');

	}

});

module.exports = router;
