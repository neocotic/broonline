module.exports = function browserify(grunt) {
    grunt.loadNpmTasks('grunt-browserify');

    return {
        build: {
            files: {
                '.build/js/main.js': ['public/js/main.js']
            },
            options: {
                transform: ['babelify']
            }
        }
    };
};
