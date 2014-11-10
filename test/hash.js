var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#hash()', function () {
    describe('with no arguments (getter)', function () {
        describe('when hash fragment exists', function () {
            it('should be got hash fragment when full url is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga#frag');
                l.hash().should.equal('frag');
            });

            it('should be got hash fragment when url that is omitted protocol is given', function () {
                var l = new LocationUtil('example.com:3000/foo/bar?hoge=fuga#frag');
                l.hash().should.equal('frag');
            });

            it('should be got hash fragment when url that is omitted port is given', function () {
                var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
                l.hash().should.equal('frag');
            });

            it('should be got hash fragment when url that is omitted path is given', function () {
                var l = new LocationUtil('http://example.com:3000?hoge=fuga#frag');
                l.hash().should.equal('frag');
            });

            it('should be got hash fragment when url that is omitted query parameters is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo/bar#frag');
                l.hash().should.equal('frag');
            });

            it('should be got hash fragment when minimal url is given', function () {
                var l = new LocationUtil('example.com#frag');
                l.hash().should.equal('frag');
            });
        });

        describe('when hash fragment is empty', function () {
            it('should be got blank string when full url is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga');
                l.hash().should.equal('');
                l.protocol().should.equal('http');
                l.host().should.equal('example.com');
                l.port().should.equal(3000);
                l.path().should.equal('/foo/bar');
                l.search().should.deep.equal({'hoge': 'fuga'});
            });

            it('should be got blank string when url that is omitted protocol is given', function () {
                var l = new LocationUtil('example.com:3000/foo/bar?hoge=fuga');
                l.hash().should.equal('');
                l.protocol().should.equal('');
                l.host().should.equal('example.com');
                l.port().should.equal(3000);
                l.path().should.equal('/foo/bar');
                l.search().should.deep.equal({'hoge': 'fuga'});
            });

            it('should be got blank string when url that is omitted port is given', function () {
                var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga');
                l.hash().should.equal('');
                l.protocol().should.equal('http');
                l.host().should.equal('example.com');
                should.equal(l.port(), null);
                l.path().should.equal('/foo/bar');
                l.search().should.deep.equal({'hoge': 'fuga'});
            });

            it('should be got blank string when url that is omitted path is given', function () {
                var l = new LocationUtil('http://example.com:3000?hoge=fuga');
                l.hash().should.equal('');
                l.protocol().should.equal('http');
                l.host().should.equal('example.com');
                l.port().should.equal(3000);
                l.path().should.equal('/');
                l.search().should.deep.equal({'hoge': 'fuga'});
            });

            it('should be got blank string when url that is omitted query parameters is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo/bar');
                l.hash().should.equal('');
                l.protocol().should.equal('http');
                l.host().should.equal('example.com');
                l.port().should.equal(3000);
                l.path().should.equal('/foo/bar');
                l.search().should.deep.equal({});
            });

            it('should be got blank string when minimal url is given', function () {
                var l = new LocationUtil('example.com');
                l.hash().should.equal('');
                l.protocol().should.equal('');
                l.host().should.equal('example.com');
                should.equal(l.port(), null);
                l.path().should.equal('/');
                l.search().should.deep.equal({});
            });
        });
    });

    describe('with arguments (setter)', function () {
        it('should set hash fragment successfully', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.hash('foobar').hash().should.equal('foobar');
        });

        it('should delete hash fragment successfully', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.hash('').hash().should.equal('');
        });
    });
});

