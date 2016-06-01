var createNewCalendar = {};

createNewCalendar.setAllDates = function() {

	// The now empty Calendar
	var fullCalendar = {};

	// All the years I want to create
	var years = [2016, 2017, 2018];
	// All the years I want to create
	var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	// Calendar Object

	// Loop thrue the set years
	years.forEach(function(year) {

		// add the years a object to the calendar object
		fullCalendar[year] = {};

		// Loop thrue the months in that year
		months.forEach(function(month) {

			fullCalendar[year][month] = {};

			// get the days in this month
			calendar.getDaysInMonth(month, year, fullCalendar);

		});

	});

}

createNewCalendar.getDaysInMonth = function(month, year, fullCalendar) {

	var _month = month - 1;
	var _year = year;
	var _fullCalendar = fullCalendar;

    var date = new Date(_year, _month, 1);
    // Loop thure the days in this month
    // Thx Juan Mendes for this bit of code!
    // Source: http://stackoverflow.com/questions/13146418/find-all-the-days-in-a-month-with-date-object
    while (date.getMonth() === _month) {

    	// Create a new day
    	var day = new Date(date).getDate();
        // Create the calendar object
        calendar.createCalendarObject(year, month, day, fullCalendar);
        // Loop the next day
        date.setDate(date.getDate() + 1);
    }
}

createNewCalendar.createCalendarObject = function(year, month, day, fullCalendar) {

	var _year = year;
	var _month = month;
	var _day = day;
	var _fullCalendar = fullCalendar;

	_fullCalendar[_year][_month][_day] = {
		fullDate: _year + "-" + _month + "-" + _day,
		avalible: [],
		indication: 0
	};

	// get the calendar data
		// if the year already exisit --> dont add it
		// if it doesn't exist --> add this year

}

module.exports = createNewCalendar;