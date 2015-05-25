module.exports = function mochacli(grunt) {
    grunt.loadNpmTasks('grunt-mocha-cli');

    return {
        src: ['test/**/*.js'],
        options: {
            timeout: 6000,
            'check-leaks': true,
            ui: 'bdd',
            reporter: 'spec'
        }
    };
};
