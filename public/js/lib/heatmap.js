'use strict';

define([
    'jquery',
    './google-maps'
], function($, gmaps) {

    function Heatmap(options) {
        this.map = options.map;

        this._array = new gmaps.MVCArray([]);
        this._heatmap = new gmaps.visualization.HeatmapLayer({
            data: this._array
        });
        this._heatmap.setMap(this.map.map);
        this._heatmap.setValues({
            gradient: [
                'rgba(160, 82, 45, 0)',
                'rgba(160, 82, 45, 0)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)',
                'rgba(160, 82, 45, 1)'
            ],
            maxIntensity: 1,
            opacity: 0.75,
            radius: 25
        });

        this.load();
    }

    Heatmap.prototype.load = function() {
        return $.ajax({
            method: 'GET',
            url: '/api/places/heatmap',
            dataType: 'json',
            success: this._update()
        });
    };

    Heatmap.prototype._update = function() {
        return $.proxy(function(data) {
            var array = this._array;
            array.clear();

            $.each(data, function(index, place) {
                array.push(new gmaps.LatLng(place.position.latitude, place.position.longitude));
            });
        }, this);
    };

    return Heatmap;

});
