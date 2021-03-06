var fs = require('fs');

var fileHandling = {};

	fileHandling.read = function(url) {

		return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

			// store variables
			var _data;
			var _url = url;

			// use fs to read the file
			fs.readFile(_url, function(err, data) {
			  	if (err) {
			  		reject = err;	
			  	} else {
			  		_data = data;
			  		// return data thrue the resolve of the promise
			  		resolve(JSON.parse(_data));
			  	}  	
			});

		});

	}

	fileHandling.write = function(url, data) {

		return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

			// store variables
			var _data = JSON.stringify(data);
			var _url = url;

			// use fs to read the file
			fs.writeFile(_url, _data, function(err) {
			  	if (err) {
			  		reject = err;	
			  	} else {
			  		fs.readFile(_url, function(err, data) {
			  		  	if (err) {
			  		  		reject = err;	
			  		  	} else {
			  		  		_data = data;
			  		  		// return data thrue the resolve of the promise
			  		  		resolve(JSON.parse(_data));
			  		  	}  	
			  		});
			  	}
			});

		});

	}

module.exports = fileHandling;