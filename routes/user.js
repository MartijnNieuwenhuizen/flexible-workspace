var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');
var sessionHandling = require('./modules/sessionHandling');

router.get('/login', function(req, res, next) {
  
	res.render('login');

});

router.post('/login', function(req, res, next) {

  	// the name filled in by the user
	var inputName = req.body.username;

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
			res.redirect('/calendar');

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

	console.log(req.body);
  
	var username = req.body.username;
	var desk = req.body.desk;

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
				id: Object.keys(users[0]).length + 1
			};

			var sess = req.session;
			sess.views = 1;
			sess.userId = users[0][username].id;
			
			// write the new userdata
			fileHandling.write('./routes/data/users.json', users)
			.then(function(response) {

				var newUserData = response;
				res.redirect('/calendar');

			}).catch(function(res) {console.log("Error: ", res)});

		}


	}).catch(function(res) {console.log("Error: ", res)});


});



router.get('/:name', function(req, res, next) {

	// count a new session view, or set the sesssion view
	var sess = req.session;
  	if (sess.views) {
	    sess.views++;
	    res.end();
  	} else {
	    sess.views = 1;
	    res.end();
  	}

  	// console.log(sessionId, sessionCookie, sess.views);

  	// req.session.regenerate(function(err) {
  	  	
  	//   	// will have a new session here

  	// })
  	// req.session.reload(function(err) {
  	 	
  	//  	// session updated

  	// })



  
	var userName = req.params.name;
	res.send("User: " + userName);

});

module.exports = router;
