'use strict';

module.exports = function copyto(grunt) {
    grunt.loadNpmTasks('grunt-copy-to');

    return {
        build: {
            files: [
                {
                    cwd: 'public',
                    src: ['**/*'],
                    dest: '.build/'
                }
            ],
            options: {
                ignore: [
                    'public/css/**/*',
                    'public/js/**/*',
                    'public/templates/**/*'
                ]
            }
        }
    };
};
