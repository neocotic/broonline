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
    './lib/marker',
    './lib/feedback'
], function($, Map, AutoComplete, Heatmap, Marker, Feedback) {

    function App() {
        var $autoComplete = $('#pac-input');
        var $map = $('#map-canvas');
        var $support = $('.navbar-link-support');

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

        this.feedback = new Feedback({
            $el: $support
        });
    }

    return new App();

});
