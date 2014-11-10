var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#host()', function () {
    it('should be got host when full url is given', function () {
        var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga#frag');
        l.host().should.equal('example.com');
    });

    it('should be got host when url that is omitted protocol is given', function () {
        var l = new LocationUtil('example.com:3000/foo/bar?hoge=fuga#frag');
        l.host().should.equal('example.com');
    });

    it('should be got host when url that is omitted port is given', function () {
        var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga#frag');
        l.host().should.equal('example.com');
    });

    it('should be got host when url that is omitted path is given', function () {
        var l = new LocationUtil('http://example.com:3000?hoge=fuga#frag');
        l.host().should.equal('example.com');
    });

    it('should be got host when url that is omitted query parameters is given', function () {
        var l = new LocationUtil('http://example.com:3000/foo/bar#frag');
        l.host().should.equal('example.com');
    });

    it('should be got host when url that is omitted hash fragment is given', function () {
        var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga');
        l.host().should.equal('example.com');
    });

    it('should be got host when minimal url is given', function () {
        var l = new LocationUtil('example.com');
        l.host().should.equal('example.com');
    });
});

