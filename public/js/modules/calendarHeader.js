var calendarHeader = {};

calendarHeader.setListener = function() {

    window.addEventListener('scroll', calendarHeader.checkPosition, false);

}

calendarHeader.getHeaders = function() {

    var headers = {};
    headers.month = document.querySelector('.calendar-months');
    headers.days = document.querySelector('.days-title');
    headers.calendarContainer = document.querySelector('.calendar-container');

    return headers;

}

calendarHeader.checkPosition = function() {

    var headers = calendarHeader.getHeaders();
    var headerTopPos = headers.month.offsetTop;

    var windowPos = window.pageYOffset + 15;

    if ( windowPos > headerTopPos ) {

        calendarHeader.setSticky();

    }
    if ( windowPos < 86 ) {

        calendarHeader.removeSticky();

    }

}

calendarHeader.setSticky = function() {

    var headers = calendarHeader.getHeaders();
    headers.month.classList.add('js-month-sticky');
    headers.days.classList.add('js-day-sticky');
    headers.calendarContainer.classList.add('js-containerPadding');

}

calendarHeader.removeSticky = function() {

    var headers = calendarHeader.getHeaders();
    headers.month.classList.remove('js-month-sticky');
    headers.days.classList.remove('js-day-sticky');
    headers.calendarContainer.classList.remove('js-containerPadding');

}

module.exports = calendarHeader;
