var calendar = function() {}

calendar.setRightMonth = function() {

	// get the hash
	// if there's no hash, get the current date, set a hash and add the class
	// if there's a hash, set the class

	var hash = document.location.hash;
	if ( hash.length ) {
 
		var months = document.querySelectorAll('.calendar-months a');
		var thisMonth = calendar.getThisMonth();
		
		months[thisMonth].classList.add('active');
		

 	} else {



 	}

}
calendar.getThisMonth = function() {

	var today = new Date();
	var thisMonthNumber = today.getMonth();

	return thisMonthNumber;

}

module.exports = calendar;