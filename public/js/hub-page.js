(function() {

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
	* initialize this hub when
	* @param {string} varname Description
	* @returns {undefined}
	*/
	const initHub = function() {
		initSocketListeners();
	};



	// init when connection is ready	
	document.addEventListener('connectionready.socket', initHub);

})();