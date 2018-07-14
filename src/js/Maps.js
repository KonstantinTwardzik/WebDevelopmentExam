var GoogleMapsLoader = require("google-maps");

class Maps {
	createMap(currentMeeting) {
		//release for loading new Map on initialize and returning from print mode
		GoogleMapsLoader.release();
		let mapSec = document.createElement("section");
		mapSec.id = "map";
		this.loadMap(mapSec, currentMeeting);
		return mapSec;
	}

	//when selecting another meeting
	updateMap(currentMeeting) {
		let mapSec = document.getElementById("map");
		this.loadMap(mapSec, currentMeeting);
	}

	loadMap(mapSec, currentMeeting) {
		let coordinates = {
			lat: currentMeeting.getCoordinates()[0],
			lng: currentMeeting.getCoordinates()[1]
		};
		//needed for verification
		GoogleMapsLoader.KEY = "AIzaSyCIXJRNCkfv7Sg5948vYfoiCtgnazWoNJw";
		GoogleMapsLoader.load(function (google) {
			var map = new google.maps.Map(mapSec, {
				//sets map focus on coordinates
				center: coordinates,
				zoom: 12,
				//style for fitting into the black theme
				styles: [
					{
						elementType: "geometry",
						stylers: [
							{
								color: "#212121"
							}
						]
					},
					{
						elementType: "labels.icon",
						stylers: [
							{
								visibility: "off"
							}
						]
					},
					{
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#757575"
							}
						]
					},
					{
						elementType: "labels.text.stroke",
						stylers: [
							{
								color: "#212121"
							}
						]
					},
					{
						featureType: "administrative",
						elementType: "geometry",
						stylers: [
							{
								color: "#757575"
							}
						]
					},
					{
						featureType: "administrative.country",
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#9e9e9e"
							}
						]
					},
					{
						featureType: "administrative.locality",
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#bdbdbd"
							}
						]
					},
					{
						featureType: "poi",
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#757575"
							}
						]
					},
					{
						featureType: "poi.park",
						elementType: "geometry",
						stylers: [
							{
								color: "#181818"
							}
						]
					},
					{
						featureType: "poi.park",
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#616161"
							}
						]
					},
					{
						featureType: "poi.park",
						elementType: "labels.text.stroke",
						stylers: [
							{
								color: "#1b1b1b"
							}
						]
					},
					{
						featureType: "road",
						elementType: "geometry.fill",
						stylers: [
							{
								color: "#2c2c2c"
							}
						]
					},
					{
						featureType: "road",
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#8a8a8a"
							}
						]
					},
					{
						featureType: "road.arterial",
						elementType: "geometry",
						stylers: [
							{
								color: "#373737"
							}
						]
					},
					{
						featureType: "road.arterial",
						elementType: "labels",
						stylers: [
							{
								visibility: "off"
							}
						]
					},
					{
						featureType: "road.highway",
						elementType: "geometry",
						stylers: [
							{
								color: "#3c3c3c"
							}
						]
					},
					{
						featureType: "road.highway",
						elementType: "labels",
						stylers: [
							{
								visibility: "off"
							}
						]
					},
					{
						featureType: "road.highway.controlled_access",
						elementType: "geometry",
						stylers: [
							{
								color: "#4e4e4e"
							}
						]
					},
					{
						featureType: "road.local",
						stylers: [
							{
								visibility: "off"
							}
						]
					},
					{
						featureType: "road.local",
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#616161"
							}
						]
					},
					{
						featureType: "transit",
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#757575"
							}
						]
					},
					{
						featureType: "water",
						elementType: "geometry",
						stylers: [
							{
								color: "#000000"
							}
						]
					},
					{
						featureType: "water",
						elementType: "labels.text.fill",
						stylers: [
							{
								color: "#3d3d3d"
							}
						]
					}
				] });
			//warning: value never used, but google-maps uses marker
			//eslint-disable-next-line
			var marker = new google.maps.Marker({
				position: coordinates,
				map: map,
				title: currentMeeting.getName()
			});
		});
	}
}

module.exports.Maps = Maps;
