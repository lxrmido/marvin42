var dust = require('../lib/dust');

var _eventList = ['onopen', 'onclose', 'onmessage', 'onerror'];

export default class WSWorker{

	constructor(option){

		var that = this;

		that.option   = option;
		that.url      = option.url;
		that.deffered = 100;

		_eventList.forEach((x) => {
			if(x in option){
				that[x] = option[x];
			}
		});

		that.connect();


	}

	connect(){
		var that = this;

		that.isReady = false;
		that.wso = new WebSocket(that.url, 'marvin42');
		that.queue = [];

		_eventList.forEach((x) => {
			that.wso[x] = that['_' + x].bind(that);
		});
	}

	send(msg){
		if(this.isReady){
			this.sendText(JSON.stringify(msg));
		}else{
			this.queue.push(JSON.stringify(msg));
		}
	}

	sendNext(){
		if(this.queue.length > 0){
			this.sendText(this.queue.shift());
			this.sendNext();
		}else{
			return;
		}
	}

	sendText(text){
		this.wso.send(text);
	}

	_onopen(event){
		dust.log('OPENED', event);
		this.isReady  = true;
		this.deffered = 100;
		this.sendNext();
		return this.onopen && this.opopen(event);
	}

	_onclose(event){
		var that = this;
		that.isReady = false;
		dust.log('CLOSED', 'reconnect after ' + that.deffered + 'ms.');
		setTimeout(() => {
			that.deffered += 2000;
			that.connect();
		}, that.deffered);
		return this.onclose && this.onclose(event);
	}

	_onmessage(event){
		var that = this;
		var data;
		try{
			data = JSON.parse(event.data);
		}catch(e){
			dust.err('ParseError', event.data);
			return that.onmessage && that.onmessage({
				proto : 'ParseError'
			});
		}
		return that.onmessage && that.onmessage(data);
	}

	_onerror(event){
		dust.log(event);
		return this.onerror && this.onerror(event);
	}

};


