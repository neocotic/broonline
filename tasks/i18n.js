'use strict';

module.exports = function clean(grunt) {
    grunt.registerTask('i18n', ['clean', 'localizr', 'dustjs', 'clean:tmp']);

    return {};
};
