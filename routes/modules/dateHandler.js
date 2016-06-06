var dateHandler = {};

dateHandler.getCurrentMonth = function(years) {

	return new Promise(function(resolve, reject) {

		var _years = years;

		var today = new Date();
		var thisMonth = today.getMonth();
		var thisYear = today.getFullYear();
		var currentMonthName = _years[thisYear][thisMonth];

		resolve(currentMonthName);

	});

}

module.exports = dateHandler;