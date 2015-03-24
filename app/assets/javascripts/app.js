$(function(){
	spaces = new SpaceCollection();
	spaces.fetch();
	spacesCollView = new SpaceCollectionView({
		collection: spaces
	})
})