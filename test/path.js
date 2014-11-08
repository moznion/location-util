var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#path', function () {
    describe('with no arguments (getter)', function () {
        it('should get paths with parameters', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.path().should.equal('/foo/bar');
        });

        it('should get paths with fragment', function () {
            var l = new LocationUtil('http://example.com/foo/bar#frag');
            l.path().should.equal('/foo/bar');
        });

        it('should get paths without protocol', function () {
            var l = new LocationUtil('example.com/foo/bar');
            l.path().should.equal('/foo/bar');
        });

        it('should get only slash', function () {
            var l = new LocationUtil('http://example.com');
            l.path().should.equal('/');
        });
    });

    describe('with arguments (setter)', function () {
        it('should set path successfully', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            var changed = l.path('/hoge/fuga');
            changed.path().should.equal('/hoge/fuga');
        });

        it('complete leading slash if it is omitted', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            var changed = l.path('hoge/fuga');
            changed.path().should.equal('/hoge/fuga');
        });
    });
});
