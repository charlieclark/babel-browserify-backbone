var envMap = {
	local:{
		match: "local.mac.com"
	},
	dev:{
		match: "mac-dev.tumblr.com"
	},
	prod:{

	}
};

var url = window.location.href;
var env = "local";


export function getEnv(){
	if(!env){
		for( let key in envMap ){
			let _env = envMap[key];
			if( url.indexOf( _env.match ) >= 0 ){
				env = key;
				break;
			}
		}
	}
	return env;
}