/*
* Node socket interface
*/
export default class {
	constructor(msg) {
		this.msg = msg;
		console.log('node-socket constructor');
		// console.log(msg);
	}

	/**
	* say msg
	* @returns {undefined}
	*/
	say() {
		console.log(this.msg);
	};
}
