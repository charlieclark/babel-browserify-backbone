var stage, renderer;
var mouseX, mouseY;

import Vector2 from "Vector2";

function init(el) {

	renderer = PIXI.autoDetectRenderer( window.innerWidth, window.innerHeight, {
		antialias: true
	});

	el.appendChild( renderer.view );

	stage = new PIXI.Container();

	window.addEventListener("resize", resize);
	window.addEventListener("mousemove", mousemove);

	start();

	animate();
}

function start(){
	var node = new Node({
		x : window.innerWidth / 2,
		y : window.innerHeight / 2,
	});

	stage.addChild(node.group);
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

//
class Node{
	constructor({x, y}){
		this.position = new Vector2(x,y);
		this.group = new PIXI.Container();
		this.init();
	}

	init(){
		this.group.addChild(this.circle());
		this.update();
	}

	update(){
		this.group.position.set( this.position.x, this.position.y );
	}

	circle(){
		// create a new graphics object
		var graphics = new PIXI.Graphics();
		graphics.beginFill(0xffffff);
		graphics.drawCircle(0, 0, 3);
		graphics.endFill();
		return graphics;
	}
}

export default {
	init : init
}