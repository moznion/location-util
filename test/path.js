var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#path()', function () {
    describe('with no arguments (getter)', function () {
        describe('when path exists', function () {
            it('should be got path when full url is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga#frag');
                l.path().should.equal('/foo/bar');
            });

            it('should be got path when url that is omitted protocol is given', function () {
                var l = new LocationUtil('example.com:3000/foo/bar?hoge=fuga#frag');
                l.path().should.equal('/foo/bar');
            });

            it('should be got path when url that is omitted port is given', function () {
                var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
                l.path().should.equal('/foo/bar');
            });

            it('should be got path when url that is omitted query parameters is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo/bar#frag');
                l.path().should.equal('/foo/bar');
            });

            it('should be got path when url that is omitted hash fragment is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga');
                l.path().should.equal('/foo/bar');
            });

            it('should be got path when minimal url is given', function () {
                var l = new LocationUtil('example.com/foo/bar');
                l.path().should.equal('/foo/bar');
            });
        });

        describe('when path does not exist', function () {
            it('should be got only slash as path when full url is given', function () {
                var l = new LocationUtil('http://example.com:3000?hoge=fuga#frag');
                l.path().should.equal('/');
                l.protocol().should.equal('http');
                l.host().should.equal('example.com');
                l.port().should.equal(3000);
                l.search().should.deep.equal({'hoge': 'fuga'});
                l.hash().should.equal('frag');
            });

            it('should be got only slash as path when url that is omitted protocol is given', function () {
                var l = new LocationUtil('example.com:3000?hoge=fuga#frag');
                l.path().should.equal('/');
                l.protocol().should.equal('');
                l.host().should.equal('example.com');
                l.port().should.equal(3000);
                l.search().should.deep.equal({'hoge': 'fuga'});
                l.hash().should.equal('frag');
            });

            it('should be got only slash as path when url that is omitted port is given', function () {
                var l = new LocationUtil('http://example.com?hoge=fuga#frag');
                l.path().should.equal('/');
                l.protocol().should.equal('http');
                l.host().should.equal('example.com');
                should.equal(l.port(), null);
                l.search().should.deep.equal({'hoge': 'fuga'});
                l.hash().should.equal('frag');
            });

            it('should be got only slash as path when url that is omitted query parameters is given', function () {
                var l = new LocationUtil('http://example.com:3000#frag');
                l.path().should.equal('/');
                l.protocol().should.equal('http');
                l.host().should.equal('example.com');
                l.port().should.equal(3000);
                l.search().should.deep.equal({});
                l.hash().should.equal('frag');
            });

            it('should be got only slash as path when url that is omitted hash fragment is given', function () {
                var l = new LocationUtil('http://example.com:3000?hoge=fuga');
                l.path().should.equal('/');
                l.protocol().should.equal('http');
                l.host().should.equal('example.com');
                l.port().should.equal(3000);
                l.search().should.deep.equal({'hoge': 'fuga'});
                l.hash().should.equal('');
            });

            it('should be got only slash as path when minimal url is given', function () {
                var l = new LocationUtil('example.com');
                l.path().should.equal('/');
                l.protocol().should.equal('');
                l.host().should.equal('example.com');
                should.equal(l.port(), null);
                l.search().should.deep.equal({});
                l.hash().should.equal('');
            });
        });
    });

    describe('with arguments (setter)', function () {
        it('should set path successfully', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.path('/hoge/fuga').path().should.equal('/hoge/fuga');
        });

        it('should complete leading slash if it is omitted', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.path('hoge/fuga').path().should.equal('/hoge/fuga');
        });

        it('should delete path successfully', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.path('').path().should.equal('/');
        });
    });
});
