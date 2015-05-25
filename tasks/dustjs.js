module.exports = function dustjs(grunt) {
    grunt.loadNpmTasks('grunt-dustjs');

    return {
        build: {
            files: [
                {
                    expand: true,
                    cwd: 'tmp/',
                    src: '**/*.dust',
                    dest: '.build/templates',
                    ext: '.js'
                }
            ],
            options: {
                fullname: function (filepath) {
                    var path = require('path');
                    var name = path.basename(filepath, '.dust');
                    var parts = filepath.split('/');
                    var fullname = parts.slice(3, -1).concat(name);

                    return fullname.join('/');
                }
            }
        }
    };
};
