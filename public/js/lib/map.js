'use strict';

define([
    'jquery',
    './google-maps'
], function($, gmaps) {

    var DEFAULT_POSITION = new gmaps.LatLng(55.9410656, -3.2053836);

    function Map(options) {
        this.$el = options.$el;
        this.el = this.$el[0];

        this.map = new gmaps.Map(this.el, {
            zoom: 8
        });

        this.getInitialPosition = this.getInitialPosition($.proxy(function(position) {
            this.map.setCenter(position);
        }, this));
    }

    Map.prototype.getInitialPosition = function(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    callback(new gmaps.LatLng(position.coords.latitude,  position.coords.longitude));
                },
                function() {
                    callback(DEFAULT_POSITION);
                });
        } else {
            callback(DEFAULT_POSITION);
        }
    };

    return Map;

});
