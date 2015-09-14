let state = new(Backbone.Model.extend({
	defaults: {
		//navigation
		page: null,
		section: null,
		path: null
	},
	routes: {
		//base routes
		":page/:section/*path": "onRoute",
		":page/:section": "onRoute",
		":page": "onRoute",
		"": "onRoute",
	},
	onRoute: function(page, section, path) {
		page = this.getUrlPageName(page, true);

		let obj = {
			'page': page,
			'section': section,
			'path': path
		};

		if (!_.has(this.urlNames, this.unSingle(page))) {
			this.navigate(this.defaultPage || null, null, null, true)
		} else {
			this.set(obj);
		}
	},
	navigate: function(page, section, path, reset) {
		let hash = this.getPath(page, section, path, reset);

		Backbone.history.navigate(hash.url, {
			trigger: true
		});

		this.set(hash.stateSet);
	},
	back: function() {
		Backbone.history.history.back()
	},
	getPath: function(page, section, path, reset) {

		// use current section if section is null or not specified
		page = _.isString(page) ? page : (reset ? null : this.get('page'));
		section = _.isString(section) ? section : (reset ? null : this.get('section'));
		path = _.isString(path) ? path : (reset ? null : this.get('path'));

		//add ! in front of a path value to not update url
		let vals = {
			page,
			section,
			path
		}

		let stateSet = {};

		_.each(vals, (val, key) => {
			if (val && val.indexOf("!") >= 0) {
				stateSet[key] = val.replace("!", "");
				vals[key] = null;
			}
		});

		//get correct page for URL
		vals.page = this.getUrlPageName(vals.page);

		let url = '/';
		if (vals.page) {
			url += vals.page;
			if (vals.section) {
				url += '/' + vals.section;
				if (vals.path) {
					url += '/' + vals.path;
				}
			}
		}
		return {
			url,
			stateSet
		};
	},
	getUrlPageName: function(name, reverse) {
		let returnName = _.findKey(this.urlNames, function(value) {
			return name == value;
		});

		if (!reverse) {
			returnName = this.urlNames[name];
		}

		return returnName;
	},
	unSingle: function(str) {
		if (str) {
			str = str.replace("-single", "");
		}
		return str;
	},
	start: function(pages) {
		this.pages = pages;

		//config routes
		this.urlNames = {};
		_.each(pages, (page, key) => {
			key = this.unSingle(key);
			if(!this.urlNames[key]){
				this.urlNames[key] = page.slug || key;
			}
			if(page.default){
				this.defaultPage || null = key;
			}
		});

		this.router = new(Marionette.AppRouter.extend({
			controller: this,
			appRoutes: this.routes
		}));

		Backbone.history.start({
			root: "/",
			pushState: false
		});
	}
}))();

export default state;