/*
* bridge between device-orientation and socket server
* listens for deviceorientation events and passes them on to the socket server
*/
;(function() {

	'use strict';

	/* global io */ //instruction for jshint

	//globals:
	//window.io is defined by socket.IO.
	//It represents the socket server.
	//io is a bit of a strange name, but it's being used in examples everywhere,
	//so let's stick to that.



	/**
	* add event listeners for socket
	* @returns {undefined}
	*/
	const initSocketListeners = function() {
		// add events you want to listen for, like this:
		// io.on('newuser', newUserHandler);
	};

	


	/**
	* initialize the remote
	* @returns {undefined}
	*/
	const init = function() {
		initSocketListeners();
	};


	// single point of entry: init when connection is ready	
	document.addEventListener('connectionready.socket', init);
})();