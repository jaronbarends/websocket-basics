(function() {

	'use strict';

	/* global io */ //instruction for jshint

	//globals:
	//window.io is defined by socket.IO.
	//It represents the socket server.
	//io is a bit of a strange name, but it's being used in examples everywhere,
	//so let's stick to that.


	const msg = document.getElementById('msg'),
	      msgList = document.getElementById('msg-list');

	/**
	* handle the new message being received from server
	* @param {object} data Data sent by remote.js's tiltchange event
	* @returns {undefined}
	*/
	const messageHandler = function(data) {
		const newMsg = document.createElement('li');
		newMsg.textContent = data.msg + ' (from ' + data.id + ')';
		msgList.append(newMsg);
	};


	/**
	* handle submit of chat form
	* @param {event} e - Submit event
	* @returns {undefined}
	*/
	const submitHandler = function(e) {
		e.preventDefault();
		const data = {
			msg: msg.value,
			id: io.id
		};
		msg.value = '';
		window.util.sockets.sendEventToSockets('chatmessage', data)
	};
	


	/**
	* initialize chat form
	* @returns {undefined}
	*/
	const initChatForm = function() {
		document.getElementById('chat-form').addEventListener('submit', submitHandler);
	};
	


	/**
	* add event listeners for all events we want to receive from socket
	* @returns {undefined}
	*/
	const initSocketListeners = function() {
		io.on('chatmessage', messageHandler);
	};


	
	/**
	* initialize this hub when
	* @param {string} varname Description
	* @returns {undefined}
	*/
	const initChat = function() {
		initChatForm();
		initSocketListeners();
	};

	
	document.addEventListener('connectionready.socket', initChat);

})();