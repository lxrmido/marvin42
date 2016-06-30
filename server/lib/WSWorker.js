var dust            = require('./dust');
var WSConnector     = require('./WSConnector');
var http            = require('http');
var async           = require('async');
var WebSocketServer = require('websocket').server;

var __uuid = 100001;

class WSWorker{

	constructor(option){

		dust.initOption({
			onconnect : null,
			onmessage : null,
			onclose : null
		}, option);

		this.onconnect = option.onconnect;
		this.onmessage = option.onmessage;
		this.onclose   = option.onclose;

		this._option   = option;

		this.httpServer = http.createServer(function(req, res){

		});

		this.httpServer.listen(option.port, () => {

		});

		this.webSocketServer = new WebSocketServer({
			httpServer : this.httpServer,
			autoAcceptConnections : false
		});

		var that = this;

		this.webSocketServer.on('request', (request) => {
			that.onrequest(request);
		});

	}

	uuid(){
		return __uuid ++;
	}

	onrequest(request){
		if(!this.originIsAllowed(request.origin)){
			request.reject();
			return false;
		}

		var that = this;

		var connector  = new WSConnector({
			wsWorker   : this,
			uuid       : this.uuid(),
			connection : request.accept('marvin42', request.origin)
		});
		
	}

	originIsAllowed(origin){
		return true;
	}
	
};

module.exports = WSWorker;