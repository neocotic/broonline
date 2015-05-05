'use strict';

define([
    'jquery',
    './google-maps'
], function($, gmaps) {

    function Map(options) {
        this.$el = options.$el;
        this.el = this.$el[0];

        this.map = new gmaps.Map(this.el, {
            center: new gmaps.LatLng(55.9410656, -3.2053836),
            zoom: 8
        });
    }

    return Map;

});
