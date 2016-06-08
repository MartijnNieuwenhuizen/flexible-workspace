var calculation = {};

calculation.newIndication = function(avaliblePeopleThisDay, totalAmountOfPeople) {

	var _avaliblePeopleThisDay = avaliblePeopleThisDay;
	var _totalAmountOfPeople = totalAmountOfPeople;

	return ((_avaliblePeopleThisDay / _totalAmountOfPeople) * 100);

}

module.exports = calculation;