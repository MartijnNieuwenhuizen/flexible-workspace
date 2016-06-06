var express = require('express');
var router = express.Router();
var fileHandling = require('./modules/fileHandling');

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
			
			// create Session???
			res.redirect('/calendar');

		} else {
			
			// render sign up page
			res.redirect('sign-up');

		}


	}).catch(function(res) {console.log("Error: ", res)});

});



router.get('/sign-up', function(req, res, next) {
  
	res.render('sign-up');

});

router.post('/sign-up', function(req, res, next) {
  
	var data = req.body;

});



router.get('/:name', function(req, res, next) {
  
	var userName = req.params.name;
	res.send("User: " + userName);

});

module.exports = router;
