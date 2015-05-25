module.exports = function(grunt) {
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    grunt.registerTask('default', ['build', 'mochacli']);
    grunt.registerTask('build', ['eslint', 'less', 'browserify', 'i18n', 'copyto']);
    grunt.registerTask('test', ['eslint', 'mochacli']);
};
