'use strict';

var calendar = {};

calendar.set = function() {

	// only run if you are on the calendar page
	if ( document.querySelector('.calendar-page') ) {

		calendar.removeSendButton();
		calendar.getAllDates();

	}

}

calendar.getAllDates = function() {

	var calendarItems = document.querySelectorAll('.calendar-container .calendar-days--item:not(.disabled) label');

	for ( var i = 0; i < calendarItems.length; i++ ) {

		calendarItems[i].addEventListener('click', calendar.setNewData, true);

	}

}

calendar.getData = function() {

	// code

}

calendar.setNewData = function() {

	var _this = this;

	// Wait for the checkbox to be checked
	setTimeout(function() {
		var data = {
			status: _this.previousElementSibling.checked,
			date: _this.previousElementSibling.name
		}

		calendar.post(data);
	}, 100);

}

calendar.setEvents = function() {

	// code

}

calendar.removeSendButton = function() {

	var submitButton = document.querySelector('.calendar-days input[type="submit"]');
	submitButton.classList.add('js-hide');

}

calendar.post = function(data) {

	var _data = data;
	var url = location.origin + "/singleData"; // use origin to avoid the query from the server

	var date = _data.date;
	var status = _data.status;

	var bla = date + "=" + status;

	var xmlhttp = new XMLHttpRequest();

	// React on the response of the request
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == XMLHttpRequest.DONE) {

			var response = JSON.parse(xmlhttp.responseText);
	        var thisDate = Object.keys(response.postData);
			var newIndication = response.indication;

			// Grow or schrink the indication bar
			var changeEl = document.querySelector('input[name="' + thisDate + '"]');
			console.dir(changeEl);

	        // add the recently added condformation animation to the element
        	var changeEl = document.querySelector('input[name="' + thisDate + '"]');
        	// if the animation classlist is already added --> remove it
        	if ( changeEl.parentElement.classList.contains("recently-added") == true ) {
        		changeEl.parentElement.classList.remove("recently-added");
        	}
        	// give him time te remove the class from the element
        	setTimeout(function() {
        		changeEl.parentElement.classList.add("recently-added");
        	},100 );

	    }
	}

	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send(bla);
}

module.exports = calendar;
