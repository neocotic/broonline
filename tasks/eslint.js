module.exports = function eslint(grunt) {
    grunt.loadNpmTasks('grunt-eslint');

    return {
        target: [
            'server.js',
            'controllers/**/*.js',
            'lib/**/*.js',
            'models/**/*.js',
            'public/js/**/*.js'
        ],
        options: {
            configFile: '.eslintrc'
        }
    };
};
