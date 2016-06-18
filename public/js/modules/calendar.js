'use strict';

var calendar = {};

calendar.set = function() {

	calendar.getAllDates();

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
	
	// code

}

calendar.post = function(data) {
	
	var _data = data;
	var url = "http://localhost:3001/singleData";

	var date = _data.date;
	var status = _data.status;

	var bla = date + "=" + status;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
	        
	        var response = xmlhttp.responseText;
	        var thisDate = Object.keys(JSON.parse(response));

	        var elStatus = JSON.parse(response)[thisDate];
	        	
	        if ( elStatus == "true" ) {
	        	var changeEl = document.querySelector('input[name="' + thisDate + '"]');
				changeEl.parentElement.classList.add("recently-added");
	        }

	    }
	}

	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send(bla);
}

module.exports = calendar;