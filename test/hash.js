var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#hash', function () {
    describe('with no arguments (getter)', function () {
        it('should get hash fragment', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.hash().should.equal('frag');
        });
    });

    describe('with arguments (setter)', function () {
        it('should set hash fragment successfully', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.hash('foobar').hash().should.equal('foobar');
        });
    });
});

