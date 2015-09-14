import state from "state";
import pages from "pages";

import HeaderView from "views/HeaderView";

let AppView = Marionette.LayoutView.extend({
	template: require("templates/appTemplate.html"),
	id: "app",
	regions: {
		header: "#header",
		footer: "#footer"
	},
	ui: {
		pages: ".page",
		commandButtons: "[data-cmd]",
		pageContainer: "#page-content",
		scrollDownArrow: ".scroll-down"
	},
	events: {
		"click @ui.commandButtons": "commandButtonClick"
	},
	stateEvents: {
		"change:page": "onRouteChange",
		"change:section": "onRouteChange"
	},
	initialize() {
		Marionette.bindEntityEvents(this, state, this.stateEvents);

		Backbone.Radio.channel("navigation").on("change:page", function( page = null, section = null, path = null ){
			state.navigate(page, section, path, true);
		});

		this._isFirstPage = true;
		this._routePage = null;
		this._currentPageKey = null;
	},
	onBeforeShow() {
		$(window).scrollTop(0);
		this.showChildView("header", new HeaderView({
			model: this.model
		}));
		this.createPageRegions();
	},
	createPageRegions() {
		_.each(pages, function(value, key) {
			let id = `page-${key}`;
			this.ui.pageContainer.append($(`<section class="page" id="${id}"></section>`));
			this.addRegion(key, `#${id}`);
		}, this);
	},
	onRouteChange(model) {
		let routePage = model.get("page");
		let routeSection = model.get("section");

		console.log(routePage, routeSection)
			
		let pageKey = null;

		if(routeSection && pages[`${routePage}-single`]){
			pageKey = `${routePage}-single`;
		} else if( pages[routePage] ){
			pageKey = routePage;
		}

		//if page hasn't changed, return
		if (pageKey == this._currentPageKey) return;

		let newRouteValues = _.pick(model.toJSON(), "page", "section", "path");
		//if page, section and path haven't changed, return
		if (_.isEqual(newRouteValues, this._currentRouteValues)) return;

		//if page different, change page
		let newPageView = this.createNextPage(pageKey);

		Promise.all([this.hideCurrentPage(), newPageView.beforeCanShow()]).then(() => {
			pipe.dispatch("postLoaded");
			this.showPage(pageKey, newPageView);
		});

		this._currentRouteValues = newRouteValues;
		this._currentPageKey = pageKey;
	},
	hideCurrentPage() {
		return new Promise((resolve, reject) => {
			let region = this.getRegion(this._currentPageKey);
			if (region && region.currentView) {
				let view = region.currentView;
				view.animateOut().then(function() {
					region.empty();
					//reset scroll
					$(window).scrollTop(0);
					resolve();
				});
			} else {
				resolve();
			}
		});
	},
	showPage(pageKey, newPageView) {
		let region = this.getRegion(pageKey);

		this.ui.pages.removeClass("active");
		region.$el.addClass("active");

		region.show(newPageView);
		this._currentPageKey = pageKey;
	},
	createNextPage(pageKey) {
		let NewView = pages[pageKey].view;
		let NewModel = pages[pageKey].model;
		let options = pages[pageKey].options || {};

		options.pageKey = pageKey;
		options.isFirstPage = this._isFirstPage;

		this._isFirstPage = false;

		return new NewView(_.extend({
			model: new NewModel(options)
		}));
	},
	commandButtonClick(e) {
		let $el = $(e.currentTarget);

		let cmd = $el.data("cmd");
		let channel = $el.data("channel") || "global";
		let arg = $el.data("arg") || "";
			arg = arg.split(",");

		console.log(cmd, channel, arg);
		
		Backbone.Radio.channel( channel ).trigger( cmd, ...arg );
		// pipe.dispatch(cmd, ...arg)
	}
});

module.exports = AppView;