'use strict';

module.exports = function requirejs(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    return {
        build: {
            options: {
                baseUrl: 'public/js',
                dir: '.build/js',
                modules: [
                    {
                        name: 'app'
                    }
                ],
                optimize: 'uglify2',
                paths: {
                    async: '../components/requirejs-plugins/src/async',
                    bootstrap: '../components/bootstrap/dist/js/bootstrap',
                    googlemaps: '../components/googlemaps-amd/src/googlemaps',
                    jquery: '../components/jquery/dist/jquery',
                },
                shim: {
                    bootstrap: {
                        deps: ['jquery']
                    }
                }
            }
        }
    };
};
