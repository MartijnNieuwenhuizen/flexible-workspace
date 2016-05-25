var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	// get name current user
	var user = {
		name: "Martijn"
	}

	var months = ["jan", "feb", "mar", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
	var day = {

	}

	var days = {
		"jan": {
			"1": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "80%"
			},
			"2": {
				"avalible": ["Drik", "Jan"],
				"indication": "100%"
			},
			"3": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"
			},
			"4": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"5": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"6": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"7": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"8": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"9": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"10": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"11": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"12": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"13": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"14": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"15": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"16": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"17": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"18": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"19": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"20": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"21": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"22": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"23": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"24": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"25": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"26": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"27": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"28": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"29": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			},
			"30": {
				"avalible": ["Drik", "Jan", "Bas", "Jos", "willem"],
				"indication": "10%"	
			}
		}, 
		"feb": {

		}, 
		"mar": {

		}, 
		"apr": {

		}, 
		"mei": {

		}, 
		"jun": {

		}, 
		"jul": {

		}, 
		"aug": {

		}, 
		"sep": {

		}, 
		"okt": {

		}, 
		"nov": {

		}, 
		"dec": {

		}
	}

	// check which month is requested
  	res.render('calendar', { name: user.name, months: months, days: days.jan });
});

module.exports = router;