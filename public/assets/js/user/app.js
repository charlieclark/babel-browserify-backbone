//babel polyfill
require("babelify/polyfill");

//first thing: monkey patch
if (!location.origin) {
	location.origin = location.protocol + "//" + location.host;
}

//an easy to access global object
window.Common = window.Common || {};

//expose some stuff as globals
import * as utils from "utils";
import * as detection from "detection";
window.utils = utils;
window.detection = detection;

//base
import AppView from "views/AppView";
import layout from "misc/layout";
import state from "state";
import pages from "pages";

//define base application
let MyApp = window.App = Marionette.Application.extend({
	el: "body",
	regions: {
		mainRegion: "#content"
	},
	initialize() {
		layout.init();
	},
	onStart() {
		let appView = new AppView({
			model: new Backbone.Model({
				pages: pages
			})
		});

		this.mainRegion.show(appView);
		state.start(pages);
		state.set({
			env: utils.getEnv()
		});

		$(window).resize();
	}
});

//kickoff app
$(function() {
	window.FastClick.attach(document.body);
	window.app = new MyApp();
	window.app.start();
});