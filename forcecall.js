var Event = require('stupid-event');
var Callctrl = require('stupid-callctrl');

function ForceCall(opts){
 	var self = {};
	var opts = opts || {};
	var call = opts;
	var tick = opts.tick; 
	var event = Event();
	var time;	
	var called = false;
	var callonce = Callctrl.once(function(){
		event.trigger('call');
	});
	
	/*
	* Private
	*/

	function start(){
		time = Date.now();
		tick.add(update);
	}

	function update(){
		var diff = (Date.now() - time);
		if(diff > opts.max || called && diff > opts.min){
			tick.remove(update);
			callonce.trigger();
		}
	}

	function trigger(){
		called = true;
	}

	/*
	* Public
	*/
	self.start = start;
	self.trigger = trigger;
	self.on = event.on;

	return self;
}

module.exports = ForceCall;