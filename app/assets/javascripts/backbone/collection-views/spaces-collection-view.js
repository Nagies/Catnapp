var SpaceCollectionView = Backbone.View.extend({
  tagName: 'ul',
  className: 'spaces-list',
  render: function(){
    this.$el.empty();
    // NEVER EVER EVER do 'var that = this' or 'var self = this'
    // do instead 'var foodCollection = this'
    var currentSpaceCollectionView = this;
    this.collection.models.forEach(function(model){
      var newView = new SpaceView({model: model});
      currentSpaceCollectionView.$el.append(newView.$el);
    })
    $('body').append(this.$el);
  },
  initialize: function(){
    this.render();
    this.collection.on('add', this.render.bind(this));
  }
})