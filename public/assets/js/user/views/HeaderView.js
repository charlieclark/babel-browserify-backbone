import state from "state";

let HeaderView = Marionette.LayoutView.extend({
	className: "header-desktop-inner",
	template: require("templates/headerTemplate.html"),
	ui: {	
		navItems: "ul li",
	},
	initialize() {
		this.listenTo(state, "change:page", this.onPageChange);
	},
	onPageChange() {
		this.ui.navItems.removeClass("active");
		this.ui.navItems.filter(function() {
			return $(this).data("arg") == state.get("page");
		}).addClass("active");
	}
});

export default HeaderView;