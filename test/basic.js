var template = require('../');
var should = require('should');
var path = require('path');
var fse = require('fs-extra');
var fs = require('fs');

describe('basic test', function() {
    'use strict';

    var src = path.resolve(__dirname, 'tmp');
    var dest = path.resolve(__dirname, 'ttt');

    it('all good', function(done) {
        template(src, dest, {variable: 'name'});
        should(fs.readFileSync(path.resolve(dest, 'nest', 'nesta.txt'), {
            encoding: 'utf8'
        })).eql('nestaaa\n', 'not same');
        done();
    });

    it('with variable', function(done) {
        template(src, dest, {interpolate: /%([\s\S]+?)%/}, {
            name: 'nanfeng'
        });
        should(fs.readFileSync(path.resolve(dest, 'nest', 'nestb.txt'), {
            encoding: 'utf8'
        })).eql('nestbbb\nnanfeng\n', 'not same');
        done();
    });

    afterEach(function() {
        fse.removeSync(dest);
    });

});
