'use strict';

module.exports = function less(grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');

    return {
        build: {
            options: {
                cleancss: false
            },
            files: [{
                expand: true,
                cwd: 'public/css',
                src: ['app.less'],
                dest: '.build/css/',
                ext: '.css'
            }]
        }
    };
};
