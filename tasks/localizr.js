'use strict';

module.exports = function localizr(grunt) {
    grunt.loadNpmTasks('grunt-localizr');

    return {
        files: ['public/templates/**/*.dust'],
        options: {
            contentPath: ['locales/**/*.properties']
        }
    };
};
