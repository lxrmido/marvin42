var dust = require('./dust');


var _m42;

var map = {

};
var ptmod = {

};


// register protos
['misc'].forEach((name)=>{
	ptmod[name] = require('../proto/' + name)(map);
});


module.exports = {

	init(marvin42){
		_m42 = marvin42;
	},

	handle(connector, message){
		if(!message.proto){
			dust.err('Message error', message);
			return;
		}
		if(!(message.proto in map)){
			dust.err('Cannot handle proto', message);
			return;
		}
		try{
			map[message.proto].call(connector, message);
		}catch(e){
			dust.err('Error with proto handler', e);
		}
	}

};