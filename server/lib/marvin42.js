var dust     = require('./dust');
var WSWorker = require('./WSWorker');
var config   = require('../config/marvin42');
var proto    = require('./proto');

module.exports = {

	wsWorker : null,

	start(){

		dust.log('Marvin42 Starting..');

		// to init websocket server
		this.procWS(config.PORT_WS_MAIN);

		dust.log('Marvin42 Started.');

	},

	procWS(port){
		this.wsWorker = new WSWorker({

			port : port,

			onconnect(wsConnector){

			},

			onmessage(wsConnector, message){
								
			},

			onclose(wsConnector){

			}

		});
	}

};
