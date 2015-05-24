'use strict';

module.exports = function ts(grunt) {
    grunt.loadNpmTasks('grunt-ts');

    return {
        build: {
            src: ['public/ts/**/*.ts'],
            dest: '.build/ts',
            options: {
                compiler: 'node_modules/typescript/bin/tsc',
                module: 'amd'
            }
        }
    };
};
