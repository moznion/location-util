var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#hash', function () {
    describe('with no arguments (getter)', function () {
        it('should get hash fragment', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#flag');
            l.hash().should.equal('flag');
        });
    });

    describe('with arguments (setter)', function () {
        it('should set hash fragment successfully', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#flag');
            var changed = l.hash('foobar')
            changed.hash().should.equal('foobar');
        });
    });
});

