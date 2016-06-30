var dust            = require('./dust');

class WSConnector{

	constructor(option){

		// console.log((new Date()) + ' Connection accepted.');
		// 
		var that = this;

		var connection = this.connection = option.connection;
		var wsWorker   = this.wsWorker = option.wsWorker;
		var uuid       = this.uuid = option.uuid;

		this.user      = null;

		connection.on('message', function(message){
			if (message.type === 'utf8') {
				// console.log('Received Message: ' + message.utf8Data);
				// connection.sendUTF(message.utf8Data);
				var decoded;
				try{
					decoded = JSON.parse(message.utf8Data);
				}catch(e){
					dust.err('Unexpected utf8Data:', message.utf8Data);
				}
				wsWorker.onmessage(that, decoded);
	        } else if (message.type === 'binary') {
				console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
				connection.sendBytes(message.binaryData);
			}
		});

		connection.on('close', function(reasonCode, description){
			// console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
			wsWorker.onclose(that);
		});

		wsWorker.onconnect(this);
	}

	send(msg){
		this.connection.sendUTF(JSON.stringify(msg));
	}

};

module.exports = WSConnector;