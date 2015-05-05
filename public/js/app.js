'use strict';

requirejs.config({
    googlemaps: {
        params: {
            key: 'AIzaSyArjTEWMV6lyyzgXjA1Pw6WipsEcElPnj8',
            libraries: 'places,visualization',
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
    './lib/heatmap',
    './lib/marker',
    './lib/navigation'
], function($, Map, AutoComplete, Heatmap, Marker, Navigation) {

    function App() {
        var $autoComplete = $('#pac-input');
        var $map = $('#map-canvas');
        var $navigation = $('.navbar-social-links');

        this.navigation = new Navigation({
            $el: $navigation
        });

        if ($autoComplete.length && $map.length) {
            this.map = new Map({
                $el: $map
            });
            this.heatmap = new Heatmap({
                map: this.map
            });
            this.marker = new Marker({
                heatmap: this.heatmap,
                map: this.map
            });
            this.autoComplete = new AutoComplete({
                $el: $autoComplete,
                map: this.map,
                marker: this.marker
            });
        }
    }

    return new App();

});
