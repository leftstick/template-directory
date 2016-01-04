'use strict';

var template = require('../');
var should = require('should');
var path = require('path');
var fse = require('fs-extra');
var fs = require('fs');

describe('basic test', function() {

    var src = path.resolve(__dirname, 'tmp');
    var dest = path.resolve(__dirname, 'ttt');

    it('all good', function(done) {
        template(src, dest, {}, {
            templateOptions: {
                variable: 'name'
            }
        });
        should(fs.readFileSync(path.resolve(dest, 'nest', 'nesta.txt'), {
            encoding: 'utf8'
        })).eql('nestaaa\n', 'not same');
        done();
    });

    it('with variable', function(done) {
        template(src, dest, {name: 'nanfeng'}, {
            templateOptions: {
                interpolate: /%([\s\S]+?)%/
            }
        });
        should(fs.readFileSync(path.resolve(dest, 'nest', 'nestb.txt'), {
            encoding: 'utf8'
        })).eql('nestbbb\nnanfeng\n', 'not same');
        done();
    });

    describe('given an existing file in the destination', function() {
        beforeEach(function() {
            fse.ensureFileSync(path.resolve(dest, 'nest', 'nesta.txt'));
        });

        it('should be overwriten by default', function() {
            template(src, dest);
            should(fs.readFileSync(path.resolve(dest, 'nest', 'nesta.txt'), {
                encoding: 'utf8'
            })).eql('nestaaa\n', 'not same');
        });

        it('should be possible to not clobber the destination files', function() {
            template(src, dest, {}, {clobber: false});
            should(fs.readFileSync(path.resolve(dest, 'nest', 'nesta.txt'), {
                encoding: 'utf8'
            })).eql('', 'not same');
        });
    });

    afterEach(function() {
        fse.removeSync(dest);
    });

});
