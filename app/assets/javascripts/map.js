var map;
var service;


function handleSearchResults(results, status){
	// console.log(results);

	for(var i =0; i < results.length; i++){
		var marker = new google.maps.Marker({
			position: results[i].geometry.location,
			map: map,
			icon: "http://i.imgur.com/XzDJvi2.png?2"
		})

		google.maps.event.addListener(marker, 'click', function() {
			// alert(marker.position);
			// $.ajax({
			// 	url: 
			// 	data: 'GET',

			// })
  		});
	}
}

function performSearch(){
	var request = {
		bounds: map.getBounds(),
		name: "Dunkin' Donuts"
	}

	service.nearbySearch(request, handleSearchResults);
}

function renderMap(position){
	
	console.log(position);

	var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var mapOptions = {
		center: currentLocation,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	var markerMe = new google.maps.Marker({
		position: currentLocation,
		map: map
	});

	service = new google.maps.places.PlacesService(map);

	// This ensures that the map bounds have been initialized before we begin the search.
	google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);

	// Circles are fun...
	var circleOptions = {
		strokeColor: "#0000FF",
		strokeOpacity: 0.8,
		strokeWeight: 1.5,
		fillColor: "#0000FF",
		fillOpacity: 0.35,
		map: map,
		center: currentLocation,
		radius: 300
	};

	var circle = new google.maps.Circle(circleOptions);
}

// function toggleBounce(){
// 	if (marker.getAnimation() !== null) {
// 		marker.setAnimation(null);
// 	} else {
// 		marker.setAnimation(google.maps.Animation.BOUNCE);
// 	}
// }

// function setMarkers(map, infowindow) {
// 	var marker = new google.maps.Marker({
// 		position: new google.maps.LatLng(
// 			venue.location.lat,
// 			venue.location.lng
// 			),
// 		map: map,
// 		title: space.all,
// 		icon: "http://i.imgur.com/XzDJvi2.png?2",
// 		animation: google.maps.Animation.DROP
// 	});
// 	attachInfo(infowindow, map, marker);
// }

// function attachInfo(infowindow, map, marker) {
// 	google.maps.event.addListenerOnce(marker, 'click', function() {
// 		infowindow.close();
// 		infowindow.open(map, );
// 	});
// }


$(document).ready(function (){
	navigator.geolocation.getCurrentPosition(renderMap);
});








