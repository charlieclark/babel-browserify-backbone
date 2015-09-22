import HomePageView from "views/pages/HomePageView";
import SecondaryPageView from "views/pages/SecondaryPageView";
import SinglePageView from "views/pages/SinglePageView";

export default {
	"home": {
		view: HomePageView,
		model: Backbone.Model,
		inNav: true,
		default: true,
		options: {
			tag: "",
			type: ""
		}
	},
	"secondary": {
		view: SecondaryPageView,
		model: Backbone.Model,
		//example of a custom slug
		slug: "alt",
		inNav: true,
		options: {
			tag: "",
			type: ""
		}
	},
	"secondary-single": {
		view: SinglePageView,
		model: Backbone.Model,
		options: {
			tag: "",
			type: ""
		}
	}
}