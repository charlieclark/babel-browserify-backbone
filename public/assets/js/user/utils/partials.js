let templates = {
	// "stretchy-bg":{
	// 	template: require("templates/partials/stretchyBg.html"),
	// 	defaults: {
	// 		url: "http://placehold.it/400x400"
	// 	}
	// }
};

let baseDefaults = {
	dataString: "",
	classString: ""
};

window.partial = function( key, _data ) {

	let data = _.extend( {}, baseDefaults, templates[ key ].defaults || {}, _data || {} );

	//adding in data atributes
	if ( data.data ) {
		let dataString = "";
		_.each( data.data, function( value, dataKey ) {
			dataString += "data-" + dataKey + "=\"" + value + "\" ";
		} );
		data.dataString = dataString;
	}

	//adding in classes
	data.classString += key;
	if ( data.classes ) {
		data.classString += " " + data.classes;
	}

	return templates[ key ].template( data );
};