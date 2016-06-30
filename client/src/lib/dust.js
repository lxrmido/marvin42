var _config;

module.exports = {

	init(config){
		_config = config;
	},

	log(type, text){
		if(_config.debug){
			if(text === undefined){
				text = type;
				type = 'DEFAULT';
			}
			console.log('%c[LOG]%c[%s]:', 'color:green', 'color:blue', type);
			console.log(text);
		}
	},

	err(type, text){
		if(_config.debug){
			if(text === undefined){
				text = type;
				type = 'DEFAULT';
			}
			console.log('%c[ERR]%c[%s]:', 'color:red', 'color:blue', type);
			console.log(text);
		}
	}

};