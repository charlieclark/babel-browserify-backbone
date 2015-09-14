import BasePageView from "views/BasePageView";

import pipe from "pipe";

let SinglePageView = BasePageView.extend({
	template: require("templates/pages/singlePageTemplate.html")
});

export default SinglePageView;