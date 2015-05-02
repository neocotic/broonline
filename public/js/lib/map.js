'use strict';

define(['jquery', 'googlemaps!'], function($, gmaps) {
    var $canvas = $('#map-canvas');
    var $input = $('#pac-input');

    if (!$canvas.length) {
        return;
    }

    var defaultPosition = new gmaps.LatLng(55.9410656, -3.2053836);
    var options = {
        zoom: 8
    };
    var map = new gmaps.Map($canvas[0], options);

    map.controls[gmaps.ControlPosition.TOP_LEFT].push($input[0]);

    var autocomplete = new gmaps.places.Autocomplete($input[0]);
    autocomplete.bindTo('bounds', map);
    autocomplete.setTypes(['establishment']);

    gmaps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                map.setCenter(new gmaps.LatLng(position.coords.latitude,  position.coords.longitude));
            },
            function() {
                map.setCenter(defaultPosition);
            });
    } else {
        map.setCenter(defaultPosition);
    }

    return map;
});
