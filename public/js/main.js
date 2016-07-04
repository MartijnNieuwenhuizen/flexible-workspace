(function() {
	'use strict';

	var app = {};

	var calendar = require('./modules/calendar.js');
	var calendarHeader = require('./modules/calendarHeader.js');

	app.launcher = function() {

		if ( ('querySelector' in document) && ('addEventListener' in document) ) {

			calendar.set();
			calendarHeader.setListener();

		}

	}

	app.launcher();

})();
