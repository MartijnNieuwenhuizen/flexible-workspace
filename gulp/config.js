'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = {

    build: './public/',
    dist: './dist/',
    base: './public/',
    taskPath: './gulp/tasks/',
    
    sass: {
        watch: ['public/css/sass/**/*.scss'],
        src: ['./public/css/sass/main.scss'],
        folder: 'css/',
        destFile: 'style.min.css'
    },

    js: {
        watch: ['public/js/**/*.js'],
        src: ['./public/js/main.js'],
        folder: 'js/',
        destFile: 'main.min.js'
    },
    
    images: {
        watch: ['public/img/uncompressed/**'],
        src: ['./public/img/uncompressed/**'],
        srcFolder: './public/img/',
        folder: 'img/'
    },

    error: function(error) {

        $.notify.onError({
            title: 'Gulp',
            message: 'Error: <%= error.message %>'
        })(error);
        this.emit('end');

    }
};

module.exports = config;