'use strict';

module.exports = function requirejs(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    return {
        build: {
            options: {
                baseUrl: '.build/ts',
                dir: '.build/js',
                modules: [
                    {
                        name: 'main'
                    }
                ],
                preserveLicenseComments: false,
                generateSourceMaps: true,
                optimize: 'uglify2',
                paths: {
                    async: '../components/requirejs-plugins/src/async',
                    bootstrap: '../components/bootstrap/dist/js/bootstrap',
                    jquery: '../components/jquery/dist/jquery'
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
