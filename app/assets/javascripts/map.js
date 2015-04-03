var map;

$(function (){
	navigator.geolocation.getCurrentPosition(renderMap);
	$('form#new_space').on('submit', createSpace);
});

function loadSpaces(){

	$.ajax({
		url: '/spaces',
		type: 'GET',
		dataType: 'json',
		success: function (results) {

			$.each(results, function(i, result){
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(result.lat, result.lng),
					map: map,
					icon: "http://i.imgur.com/XzDJvi2.png?2"
					});

				clickEvent(result, marker);

			});
		}
	});
} 

function createSpace(event){

	event.preventDefault();
	var newSpaceForm = $('form#new_space');
	if (event) { event.preventDefault(); }
		geocoder = new google.maps.Geocoder();
		geocoder.geocode ({ 'address' : newSpaceForm.find('#space_address').val()}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				newSpaceForm.find('#space_lat').val(results[0].geometry.location.lat());
				newSpaceForm.find('#space_lng').val(results[0].geometry.location.lng());
			
				$.ajax({
					url: '/spaces',
					type: 'POST',
					dataType: 'json',
					data: newSpaceForm.serialize(),
					success: function (space) {
						console.log(space);
						newSpaceForm[0].reset();
						$('a[href="#map-page"]').trigger('click');
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(space.lat, space.lng),
							map: map,
							icon: "http://i.imgur.com/dUBRbDG.png"
						});

					clickEvent(space, marker);

					}
				});
			} else {
			// Error condition
			alert('Something went wrong');
			}
	})
}

function renderMap(position){

	console.log(position);
	var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	// Map options object to hold a number of map properties
	var mapOptions = {
		center: currentLocation,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		styles: [{"featureType":"landscape","stylers":[{"hue":"#F1FF00"},{"saturation":-27.4},{"lightness":9.4},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#0099FF"},{"saturation":-20},{"lightness":36.4},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#00FF4F"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FFB300"},{"saturation":-38},{"lightness":11.2},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00B6FF"},{"saturation":4.2},{"lightness":-63.4},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#9FFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]}]
	};

	// Create a JavaScript "map" object, passing it the div element and the map properties.
	// map is a global variable
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	var markerMe = new google.maps.Marker({
		position: currentLocation,
		map: map
	});

	// We use an event listener to load the map after the page has loaded.
	google.maps.event.addListenerOnce(map, 'bounds_changed', loadSpaces);

	// Drawing a circle around our current location. FUN!
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

function clickEvent(result, marker) {

	google.maps.event.addListener(marker, 'click', function() {
		var $space_img = $('<img>').attr({'src': result.image, width: '100%'}).addClass('m6 col offset-m1');
		var $space_info = $('<div id="space-wrapper">').addClass('m4 col').css({
			"color": "white",
			'position': 'relative',
			'font-size': 'larger',
			'padding-top': '100px'
		});
		var $exit_info = $('<i class="fa fa-times"></i>').css({
			'color':'red', 
			'position': 'absolute',
			'top': '2px',
			'right': '-8px',
			'cursor': 'pointer'
		});
		$space_info.append(
			$("<div>").append($('<span>').text('Address'))
					  .append($('<span>').text(result.address))
		);
		$space_info.append(
			$("<div>").append($('<span>').text('Hourly Rate'))
				      .append($('<span>').text('$' + result.rate))
		);
		$space_info.append(
			$("<div>").append($('<span>').text('Description'))
					  .append($('<span>').text(result.description))
		);
		$space_info.append(
			$("<div>").append($('<span>').text('Host Email'))
					  .append($('<span>').text(result.email))
		);
		$space_info.append($exit_info);
		$('#space_info').empty().append($space_img).append($space_info).show();
		$('#map-canvas').slideUp();

			$exit_info.on('click', function(e){
				$('#map-canvas').slideDown(function (){
					$('#space_info').hide();
				});
			});
	});
}






