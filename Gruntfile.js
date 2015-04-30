'use strict';

module.exports = function(grunt) {

    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    grunt.registerTask('default', ['build', 'mochacli']);
    grunt.registerTask('build', ['jshint', 'less', 'requirejs', 'i18n', 'copyto']);
    grunt.registerTask('test', ['jshint', 'mochacli']);

};
