var BasePageView =  Marionette.LayoutView.extend({
	className : "page-inner",
	animateIn() {
		return new Promise((resolve,reject)=>{
			TweenLite.fromTo(this.$el, 1, {
				opacity: 0
			}, {
				opacity: 1,
				onComplete: () =>{
					resolve();	
				}
			});
		});
	},
	animateOut() {
		return new Promise((resolve,reject)=>{
			TweenLite.to(this.$el, 0.5, {
				opacity: 0,
				onComplete: () =>{
					resolve();	
				}
			});
		});
	},
	beforeCanShow(){
		//overwrite this method if you need to do something on page before it is shown
		return Promise.resolve();
	},
	onShow: function() {
		if (this.stateEvents) {
			Marionette.bindEntityEvents(this, state, this.stateEvents);
		}

		if (this.resize) {
			_.bindAll(this, "resize");
			$(window).on("resize", this.resize);
			this.resize();
		}

		this.animateIn();
	},
	//on destroy, cleanup
	onBeforeDestroy: function() {
		if (this.stateEvents) {
			Marionette.unbindEntityEvents(this, state, this.stateEvents);
		}

		if (this.resize) {
			$(window).off("resize", this.resize);
		}
	}
});

export default BasePageView;