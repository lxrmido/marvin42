module.exports = class {

	static log(text){
		console.log(text);
	}

	static err(text, details){
		console.log(text);
		console.log(details);
	}

	static initOption(default_option, option){
		var i;
		option = option || {};
		for(i in default_option){
			if(!(i in option)){
				option[i] = default_option[i];
			}
		}
		return option;
	}

};