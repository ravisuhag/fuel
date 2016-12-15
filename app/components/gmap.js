'use strict';

module.exports = function(target, options) {

    var defaults = {
        zoom: 16,
        center: new google.maps.LatLng(50.9683611, 1.9129048),
        mapTypeControl: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        styles: [{ "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "color": "#f5f5f2" }, { "visibility": "on" }] }, { "featureType": "administrative", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.attraction", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.place_of_worship", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.school", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "stylers": [{ "visibility": "simplified" }, { "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "color": "#ffffff" }, { "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi.park", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "color": "#71c8d4" }] }, { "featureType": "landscape", "stylers": [{ "color": "#e5e8e7" }] }, { "featureType": "poi.park", "stylers": [{ "color": "#8ba129" }] }, { "featureType": "road", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi.sports_complex", "elementType": "geometry", "stylers": [{ "color": "#c7c7c7" }, { "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "color": "#a0d3d3" }] }, { "featureType": "poi.park", "stylers": [{ "color": "#91b65d" }] }, { "featureType": "poi.park", "stylers": [{ "gamma": 1.51 }] }, { "featureType": "road.local", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.government", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.local", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road" }, { "featureType": "road" }, {}, { "featureType": "road.highway" }]
    };
    if (!options) {
        options = {};
    }
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }

    return new google.maps.Map(document.getElementById(target), options);
};
