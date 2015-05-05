'use strict';

requirejs.config({
    googlemaps: {
        params: {
            key: 'AIzaSyArjTEWMV6lyyzgXjA1Pw6WipsEcElPnj8',
            libraries: 'places,visualization',
            signed_in: true
        }
    },
    paths: {}
});

define([
    'jquery',
    './lib/map',
    './lib/auto-complete',
    './lib/heatmap',
    './lib/marker'
], function($, Map, AutoComplete, Heatmap, Marker) {

    function App() {
        var $autoCompleteElement = $('#pac-input');
        var $mapElement = $('#map-canvas');

        if ($autoCompleteElement.length && $mapElement.length) {
            this.map = new Map({
                $el: $mapElement
            });
            this.heatmap = new Heatmap({
                map: this.map
            });
            this.marker = new Marker({
                heatmap: this.heatmap,
                map: this.map
            });
            this.autoComplete = new AutoComplete({
                $el: $autoCompleteElement,
                map: this.map,
                marker: this.marker
            });
        }
    }

    return new App();

});
