module.exports = function clean(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');

    return {
        tmp: 'tmp',
        build: '.build/templates'
    };
};
