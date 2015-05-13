'use strict';

module.exports = function ts(grunt) {
    grunt.loadNpmTasks('grunt-ts');

    return {
        build: {
            src: ['public/js/**/*.ts'],
            dest: '.build/js',
            options: {
                compiler: 'node_modules/typescript/bin/tsc',
                module: 'amd'
            }
        }
    };
};
