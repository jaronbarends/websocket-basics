/*
* Node socket interface
* implements socket interface
*/
class NodeSocketInterface {
	constructor() {
		document.addEventListener('DOMContentLoaded', this.initIo);
	}

	
	/**
	* proxy for io's on method
	* @param {string} evtName - The name of the event to listen for
	* @param {function} callback - The callback function to call
	* @returns {undefined}
	*/
	on(evtName, callback) {
		window.io.on(evtName, callback);
	};

	/**
	* initialize the socket, and send event containing it to the page
	* @param {string} varname Description
	* @returns {undefined}
	*/
	initIo() {
		window.io = window.io();
		window.io.on('connectionready', () => {
			const evt = new CustomEvent('connectionready.socket');
			document.dispatchEvent(evt);
		});
	};
	

}

// initialize the class if it isn't there already
window.socket = window.socket || new NodeSocketInterface();
// document.addEventListener('DOMContentLoaded', init);
