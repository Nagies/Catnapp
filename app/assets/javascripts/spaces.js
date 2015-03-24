var map;

function renderMap(location) {
	var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
	var mapOptions = {
		center: currentLocation,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var marker = new google.maps.Marker({
		position: currentLocation,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: 'http://i.imgur.com/MrPOkeX.png?1'
	});
}

function toggleBounce(){
	if (marker.getAnimation() !== null) {
		market.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

