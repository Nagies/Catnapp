var SpaceView = Backbone.View.extend ({
	tagName: 'li',
	className: 'space-view',
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.text(this.model.get('address'));
	},
	events: {
		'click': 'destroy'
	},
	destroy: function(){
		this.$el.remove();
		this.model.destroy();
	}
})