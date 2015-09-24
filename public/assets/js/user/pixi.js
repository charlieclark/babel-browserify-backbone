var stage, renderer;
var mouseX, mouseY;

function init(el) {

	renderer = PIXI.autoDetectRenderer( window.innerWidth, window.innerHeight, {
		antialias: true
	});

	el.appendChild( renderer.view );

	stage = new PIXI.Container();

	window.addEventListener("resize", resize);
	window.addEventListener("mousemove", mousemove);
	animate();
}

function mousemove(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
}

function resize() {
	renderer.resize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	renderer.render( stage );
}

export default {
	init : init
}