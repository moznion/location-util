var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#protocol()', function () {
    it('should get protocol', function () {
        var l = new LocationUtil('http://example.com/foo?bar=buz');
        l.protocol().should.equal('http');
    });

    it('should get null when protocol is empty', function () {
        var l = new LocationUtil('example.com/foo?bar=buz');
        l.protocol().should.equal("");
    });

    describe('when protocol exist', function () {
        it('should be got protocol when full url is given', function () {
            var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga#frag');
            l.protocol().should.equal('http');
        });

        it('should be got protocol when url that is omitted port is given', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            l.protocol().should.equal('http');
        });

        it('should be got protocol when url that is omitted path is given', function () {
            var l = new LocationUtil('http://example.com:3000?hoge=fuga#frag');
            l.protocol().should.equal('http');
        });

        it('should be got protocol when url that is omitted query parameters is given', function () {
            var l = new LocationUtil('http://example.com:3000/foo/bar#frag');
            l.protocol().should.equal('http');
        });

        it('should be got protocol when url that is omitted hash fragment is given', function () {
            var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga');
            l.protocol().should.equal('http');
        });

        it('should be got protocol when minimal url is given', function () {
            var l = new LocationUtil('http://example.com');
            l.protocol().should.equal('http');
        });
    });

    describe('when protocol does not exist', function () {
        it('should be got blank string when full url is given', function () {
            var l = new LocationUtil('example.com:3000/foo/bar?hoge=fuga#frag');
            l.protocol().should.equal('');
            l.host().should.equal('example.com');
            l.port().should.equal(3000);
            l.path().should.equal('/foo/bar');
            l.search().should.deep.equal({'hoge': 'fuga'});
            l.hash().should.equal('frag');
        });

        it('should be got blank string when url that is omitted port is given', function () {
            var l = new LocationUtil('example.com/foo/bar?hoge=fuga#frag');
            l.protocol().should.equal('');
            l.host().should.equal('example.com');
            should.equal(l.port(), null);
            l.path().should.equal('/foo/bar');
            l.search().should.deep.equal({'hoge': 'fuga'});
            l.hash().should.equal('frag');
        });

        it('should be got blank string when url that is omitted path is given', function () {
            var l = new LocationUtil('example.com:3000?hoge=fuga#frag');
            l.protocol().should.equal('');
            l.host().should.equal('example.com');
            l.port().should.equal(3000);
            l.path().should.equal('/');
            l.search().should.deep.equal({'hoge': 'fuga'});
            l.hash().should.equal('frag');
        });

        it('should be got blank string when url that is omitted query parameters is given', function () {
            var l = new LocationUtil('example.com:3000/foo/bar#frag');
            l.protocol().should.equal('');
            l.host().should.equal('example.com');
            l.port().should.equal(3000);
            l.path().should.equal('/foo/bar');
            l.search().should.deep.equal({});
            l.hash().should.equal('frag');
        });

        it('should be got blank string when url that is omitted hash fragment is given', function () {
            var l = new LocationUtil('example.com:3000/foo/bar?hoge=fuga');
            l.protocol().should.equal('');
            l.host().should.equal('example.com');
            l.port().should.equal(3000);
            l.path().should.equal('/foo/bar');
            l.search().should.deep.equal({'hoge': 'fuga'});
            l.hash().should.equal('');
        });

        it('should be got blank string when minimal url is given', function () {
            var l = new LocationUtil('example.com');
            l.protocol().should.equal('');
            l.host().should.equal('example.com');
            should.equal(l.port(), null);
            l.path().should.equal('/');
            l.search().should.deep.equal({});
            l.hash().should.equal('');
        });
    });
});

