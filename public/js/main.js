(function() {
	'use strict';

	var calendar = require('./modules/calendar.js');
	var app = {};

	app.launcher = function() {

		calendar.setRightMonth();

	}

	app.launcher();

})();