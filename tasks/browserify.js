module.exports = function browserify(grunt) {
    grunt.loadNpmTasks('grunt-browserify');

    return {
        build: {
            src: ['public/js/main.js'],
            dest: '.build/js/main.js',
            options: {
                transform: ['browserify-shim', 'babelify']
            }
        }
    };
};
