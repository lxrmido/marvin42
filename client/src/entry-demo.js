var config = {
	url   : 'ws://localhost:13421',
	debug : true
};
var dust = require('./lib/dust');

////////

import WSWorker from './mod/WsWorker';

////////

dust.init(config);
var mainWsWorker = new WSWorker({
	url : config.url
});
mainWsWorker.send({
	type : 'ping'
});