'use strict';

module.exports = function jshint(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');

    return {
        files: [
            'controllers/**/*.js',
            'lib/**/*.js',
            'models/**/*.js'
        ],
        options: {
            jshintrc: '.jshintrc'
        }
    };
};
