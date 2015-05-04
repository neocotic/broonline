'use strict';

define([
    'jquery',
    './google-maps'
], function($, gmaps) {

    function AutoComplete(options) {
        this.$el = options.$el;
        this.el = this.$el[0];
        this.map = options.map;
        this.marker = options.marker;

        this._control = new gmaps.places.Autocomplete(this.el);
        this._control.bindTo('bounds', this.map.map);
        this._control.setTypes(['establishment']);

        this.map.map.controls[gmaps.ControlPosition.TOP_LEFT].push(this.el);

        gmaps.event.addListener(this._control, 'place_changed', $.proxy(function() {
            this.marker.hide();

            var place = this._control.getPlace();

            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                this.map.map.fitBounds(place.geometry.viewport);
            } else {
                this.map.map.setCenter(place.geometry.location);
                this.map.map.setZoom(17);
            }

            this.marker.setPlace(place);
        }, this));
    }

    return AutoComplete;

});
