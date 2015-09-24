//babel polyfill
require("babelify/polyfill");


import pixi from "pixi";

//kickoff app
(function(){
	pixi.init( document.getElementById("content") );
})();