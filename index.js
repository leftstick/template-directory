'use strict';

var glob = require('glob');
var path = require('path');
var fse = require('fs-extra');
var isBinaryFile = require('isbinaryfile');
var log = require('pretty-log');
var _ = require('lodash');
var fs = require('fs');

var fileExists = function(file){
    try {
        return fs.statSync(file).isFile();
    }catch (e){
        return false;
    }
};

var copy = function(source, dest, data, settings){
    var localSettings = _.merge({ clobber: true }, settings);
    var txt, out;

    if (!localSettings.clobber && fileExists(dest)){
        return;
    }

    if (isBinaryFile.sync(source)){
        fse.copySync(source, dest);
    }else {
        fse.ensureDirSync(path.dirname(dest));

        txt = fs.readFileSync(source, { encoding: 'utf8' });
        out = _.template(txt, localSettings.templateOptions)(data);
        fs.writeFileSync(dest, out, { encoding: 'utf8' });
    }
};

module.exports = function(source, destination, data, settings){
    var src = source || './';

    if (!source){
        log.warn('source isn\'t set, use "./" by default');
    }

    if (!destination || destination === src){
        log.error('destination cannot be empty, or the same as source');
        return;
    }
    var files = glob.sync('**', {
        dot: true,
        nodir: true,
        cwd: src
    });

    files.forEach(function(file){
        var dest = path.join(destination, file);
        copy(path.join(src, file), dest, data, settings);
    });
};
