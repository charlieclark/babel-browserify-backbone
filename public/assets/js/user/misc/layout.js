import state from "state";
import pipe from "pipe";
import {getSassVar} from "utils";

let $el = null;
let $window = null;
let breakpoints = null;

function init() {

	breakpoints = getSassVar( "breakpoints" );

	//wrapping html
	$el = $( "html" );
	$window = $( window );

	//resize events
	$window.resize( function() {
		onResizeWindow();
	} );

	$window.scroll( function() {
		onScrollWindow();
	} );

	listenForState();

	$window.resize();
	$window.scroll();
}

function listenForState() {
	//state change
	state.on( "change", function( model ) {
		onStateChange( model.changed, model.defaults, model._previousAttributes );
	}, this );

	onStateChange( state.toJSON(), state.defaults );
}

function onStateChange( values, defaults, previous ) {
	_.each( values, function( value, key ) {

		if ( _.isBoolean( value ) ) {
			$el.toggleClass( "state-" + key, value );
			if ( _.has( defaults, key ) ) {
				$el.toggleClass( "state-not-" + key, !value );
			}
		}
		else {
			let prevValue;

			if ( previous ) {
				prevValue = previous[ key ];
			}

			if ( prevValue ) {
				$el.toggleClass( "state-" + key + "-" + prevValue, false );
			}

			if ( value ) {
				$el.toggleClass( "state-" + key + "-" + value, true );
			}
		}
	});
}

function onResizeWindow() {
	let ww = $window.width();
	let wh = $window.height();

	// _.each( breakpoints, function( width, key ) {
	// 	state.set( "bp-" + key, ww <= width );
	// 	state.set( "not-bp-" + key, ww > width );
	// } );

	window.Common.ww = ww;
	window.Common.wh = wh; 
}

function onScrollWindow(){
	Common.scrollTop = $window.scrollTop();
	// state.set("scrolledDown", Common.scrollTop > 100 );
	// pipe.dispatch('scroll', {scrollTop: Common.scrollTop});
}

module.exports = {
	init: init
};