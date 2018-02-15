(function() {

	'use strict';

	/* global io */ //instruction for jshint

	//globals:
	//window.io is defined by socket.IO.
	//It represents the socket server.
	//io is a bit of a strange name, but it's being used in examples everywhere,
	//so let's stick to that.

	const body = document.body;

	/**
	* add listeners for body-events coming from the hub through the hubProxy
	* @returns {undefined}
	*/
	const initHubProxyListeners = function() {
		// add events you want to listen for, like this:
		// body.addEventListener('eventname.hub', callback);
	};


	
	/**
	* initialize this script when the hub-proxy is ready
	* @returns {undefined}
	*/
	const init = function() {
		initHubProxyListeners();
	};



	// single point of entry: init when connection is ready	
	if (window.hubProxy && window.hubProxy.isReady) {
		init();
	} else {
		body.addEventListener('hubready.hub', init);
	}

})();