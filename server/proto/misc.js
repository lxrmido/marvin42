

function ping(message){
	this.send({
		proto : 'pong'
	});
}


module.exports = function(map){

	map.ping = ping;

};