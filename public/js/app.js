'use strict';

requirejs.config({
    googlemaps: {
        params: {
            key: 'AIzaSyArjTEWMV6lyyzgXjA1Pw6WipsEcElPnj8',
            libraries: 'places',
            signed_in: true
        }
    },
    paths: {},
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

define([
    'jquery',
    './lib/map',
    './lib/auto-complete',
    './lib/marker'
], function($, Map, AutoComplete, Marker) {

    function App() {
        var $autoCompleteElement = $('#pac-input');
        var $mapElement = $('#map-canvas');

        if ($autoCompleteElement.length && $mapElement.length) {
            this.map = new Map({
                $el: $mapElement
            });
            this.marker = new Marker({
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
