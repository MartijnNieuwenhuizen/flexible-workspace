(function() {
	'use strict';

	var app = {};

	var calendar = require('./modules/calendar.js');
	var user = require('./modules/user.js');

	app.launcher = function() {

		if ( ('querySelector' in document) && ('addEventListener' in document) ) {
			
			calendar.set();
			// user
			
		}

	}

	app.launcher();

})();