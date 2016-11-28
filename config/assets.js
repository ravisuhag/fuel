'use strict';

const Confidence = require('confidence');

// Confidence criteria 
let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

//  Confidence document object for gulp tasks
 
internals.paths = {
    fonts: ['./assets/fonts/*'],
    styles: ['./assets/styles/**/*'],
    images: ['./assets/images/**/*'],
    misc: ['./assets/misc/*'],
    scripts: {
        main: ['./app/**/*'],
        vendor: ['./app/vendor/*.js'],
    },
    lint: [
        './app/**/*.js',
        './test/**/*.js',
    ]
};

internals.store = new Confidence.Store(internals.paths);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};