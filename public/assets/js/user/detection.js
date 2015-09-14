import {getSassVar} from "utils";

var breakpoints = getSassVar( "breakpoints" );
var width = window.innerWidth;

export var touch = !!( 'ontouchstart' in window );
export var mobile = touch && width <= breakpoints['small'];
export var desktop = !mobile;

export var browser = ( function() {
		var ua = navigator.userAgent,
			tem,
			M = ua.match( /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i ) || [];
		if ( /trident/i.test( M[ 1 ] ) ) {
			tem = /\brv[ :]+(\d+)/g.exec( ua ) || [];
			return 'IE ' + ( tem[ 1 ] || '' );
		}
		if ( M[ 1 ] === 'Chrome' ) {
			tem = ua.match( /\bOPR\/(\d+)/ );
			if ( tem != null ) return 'Opera ' + tem[ 1 ];
		}
		M = M[ 2 ] ? [ M[ 1 ], M[ 2 ] ] : [ navigator.appName, navigator.appVersion, '-?' ];
		if ( ( tem = ua.match( /version\/(\d+)/i ) ) != null ) M.splice( 1, 1, tem[ 1 ] );
		return {
			name: M[ 0 ].toLowerCase(),
			version: parseInt( M[ 1 ] )
		}
} )();

export var unsupported = ( function() {
	let name = browser.name;
	let version = browser.version;

	switch (name) {
		case 'chrome':
			if (touch === true) {
				return false;
			} else {
				if (version < 43) {
					return true;
				} else {
					return false;
				}
			}
			break;
		case 'firefox':
			if (version < 33) {
				return true;
			} else {
				return false;
			}
			break;
		case 'opera':
			return false;
			break;
		case 'safari':
			if (version < 7) {
				return true;
			} else {
				return false;
			}
			break;
		case 'msie':
			if (version < 10) {
				return true;
			} else {
				return false;
			}
			break;
		default:
			return false;
			break;
	}
})();

