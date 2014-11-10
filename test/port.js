var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;


describe('#port()', function () {
    describe('when port exists', function () {
        it('should be got port when full url is given', function () {
            var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga#frag');
            l.port().should.equal(3000);
        });

        it('should be got port when url that is omitted protocol is given', function () {
            var l = new LocationUtil('example.com:3000/foo/bar?hoge=fuga#frag');
            l.port().should.equal(3000);
        });

        it('should be got port when url that is omitted path is given', function () {
            var l = new LocationUtil('http://example.com:3000?hoge=fuga#frag');
            l.port().should.equal(3000);
        });

        it('should be got port when url that is omitted query parameters is given', function () {
            var l = new LocationUtil('http://example.com:3000/foo/bar#frag');
            l.port().should.equal(3000);
        });

        it('should be got port when url that is omitted hash fragment is given', function () {
            var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga');
            l.port().should.equal(3000);
        });

        it('should be got port when minimal url is given', function () {
            var l = new LocationUtil('example.com:3000');
            l.port().should.equal(3000);
        });
    });

    describe('when port does not exist', function () {
        it('should be got null when full url is given', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
            should.equal(l.port(), null);
            l.protocol().should.equal('http');
            l.host().should.equal('example.com');
            l.path().should.equal('/foo/bar');
            l.search().should.deep.equal({'hoge': 'fuga'});
            l.hash().should.equal('frag');
        });

        it('should be got null when url that is omitted protocol is given', function () {
            var l = new LocationUtil('example.com/foo/bar?hoge=fuga#frag');
            should.equal(l.port(), null);
            l.protocol().should.equal('');
            l.host().should.equal('example.com');
            l.path().should.equal('/foo/bar');
            l.search().should.deep.equal({'hoge': 'fuga'});
            l.hash().should.equal('frag');
        });

        it('should be got null when url that is omitted path is given', function () {
            var l = new LocationUtil('http://example.com?hoge=fuga#frag');
            should.equal(l.port(), null);
            l.protocol().should.equal('http');
            l.host().should.equal('example.com');
            l.path().should.equal('/');
            l.search().should.deep.equal({'hoge': 'fuga'});
            l.hash().should.equal('frag');
        });

        it('should be got null when url that is omitted query parameters is given', function () {
            var l = new LocationUtil('http://example.com/foo/bar#frag');
            should.equal(l.port(), null);
            l.protocol().should.equal('http');
            l.host().should.equal('example.com');
            l.path().should.equal('/foo/bar');
            l.search().should.deep.equal({});
            l.hash().should.equal('frag');
        });

        it('should be got null when url that is omitted hash fragment is given', function () {
            var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga');
            should.equal(l.port(), null);
            l.protocol().should.equal('http');
            l.host().should.equal('example.com');
            l.path().should.equal('/foo/bar');
            l.search().should.deep.equal({'hoge': 'fuga'});
            l.hash().should.equal('');
        });

        it('should be got null when minimal url is given', function () {
            var l = new LocationUtil('example.com');
            should.equal(l.port(), null);
            l.protocol().should.equal('');
            l.host().should.equal('example.com');
            l.path().should.equal('/');
            l.search().should.deep.equal({});
            l.hash().should.equal('');
        });
    });
});

