import BasePageView from "views/BasePageView";

import pipe from "pipe";

let SecondaryPageView = BasePageView.extend({
	template: require("templates/pages/secondaryPageTemplate.html")
});

export default SecondaryPageView;