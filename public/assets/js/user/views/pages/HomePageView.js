import BasePageView from "views/BasePageView";

import pipe from "pipe";

let HomePageView = BasePageView.extend({
	template: require("templates/pages/homePageTemplate.html")
});

export default HomePageView;