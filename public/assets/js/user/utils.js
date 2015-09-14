import sassVars from "json-vars.json";

//modular utils
export * from "utils/getEnv";
export * from "utils/partials";

export function getSassVar( key ) {
	let value = sassVars[ key ];

	let returnValue = value;

	if ( _.isString( value ) ) {

		returnValue = parseInt( value );

	}
	else if ( _.isObject( value ) ) {

		returnValue = _.mapObject( value, function( v ) {
			return parseInt( v );
		} );
	}

	return returnValue;
};

export function loadBgImagesInEl( $el ){
	let preloadClass = "preloaded"
	let preloadingClass = "preloading";
	let elsToLoad = $el.find(`.data-bg:not(.${preloadingClass}):not(.${preloadClass})`);
	elsToLoad.each(function(){
		let $item = $(this);
		let src = $item.data("bg");
		let $inner = $("<div class='data-bg-inner'>");
		$item.append($inner);

		$item.addClass(preloadingClass);
		$inner.css( {
			"background-image": `url("${src}")`
		});
		let img = new Image();
		img.onload = function(){
			console.log(src);
			$item.removeClass(preloadingClass);
			$item.addClass(preloadClass);
		}
		img.src = src;
	});
};

export function zeroPad( n, width, z ) {
	z = z || "0";
	n = n + "";
	return n.length >= width ? n : new Array( width - n.length + 1 ).join( z ) + n;
};

export function getUrlParameter(url, sParam) {
    var sPageURL = decodeURIComponent(url),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

export function slugify(str){
	return str
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');
};