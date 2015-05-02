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
    'bootstrap',
    './lib/map'
], function() {

    var app = {
        initialize: function() {
            // TODO: Something
        }
    };

    app.initialize();

    return app;

});
