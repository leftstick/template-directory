'use strict';

var glob = require('glob');
var path = require('path');
var fse = require('fs-extra');
var isBinaryFile = require('isbinaryfile');
var log = require('pretty-log');
var _ = require('lodash');
var fs = require('fs');

var copy = function(source, dest, data, settings) {
    var localSettings = settings || {}

    if (isBinaryFile.sync(source)) {
        fse.copySync(source, dest);
    } else {
        fse.ensureDirSync(path.dirname(dest));

        var txt = fs.readFileSync(source, {encoding: 'utf8'});
        var out = _.template(txt, localSettings.templateOptions)(data);
        fs.writeFileSync(dest, out, {encoding: 'utf8'});
    }
};

module.exports = function(source, destination, data, settings) {
    var src = source || './';

    if (!source) {
        log.warn('source isn\'t set, use "./" by default');
    }

    if (!destination || destination === src) {
        log.error('destination cannot be empty, or the same as source');
        return;
    }
    var files = glob.sync('**', {
        dot: true,
        nodir: true,
        cwd: src
    });

    files.forEach(function(file) {
        var dest = path.join(destination, file);
        copy(path.join(src, file), dest, data, settings);
    });
};
