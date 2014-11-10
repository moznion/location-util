var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#url()', function () {
    describe('with no arguments (getter)', function () {
        it('should get url', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.url().should.equal('/foo/bar?hoge=fuga#frag');
        });
    });

    describe('with arguments (setter)', function () {
        it('should set url successfully', function () {
            var l = new LocationUtil('http://example.com');
            l.url('/foo/bar?hoge=fuga#frag').url().should.equal('/foo/bar?hoge=fuga#frag');
        });

        it('should set url successfully when leading slash is omitted', function () {
            var l = new LocationUtil('http://example.com');
            l.url('foo/bar?hoge=fuga#frag').url().should.equal('/foo/bar?hoge=fuga#frag');
        });
    });
});
