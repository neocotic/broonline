'use strict';

module.exports = function i18n(grunt) {
    grunt.registerTask('i18n', ['clean', 'localizr', 'dustjs', 'clean:tmp']);

    return {};
};
