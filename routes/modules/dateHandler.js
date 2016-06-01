var dateHandler = {};

dateHandler.getCurrentMonth = function(months) {

	return new Promise(function(resolve, reject) {

		var _months = months;

		var today = new Date();
		var thisMonth = today.getMonth();
		var currentMonthName = _months[thisMonth];

		resolve(currentMonthName);

	});

}

module.exports = dateHandler;