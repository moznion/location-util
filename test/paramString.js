var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#paramString()', function () {
    it('should be got parameter string when full url is given', function () {
        var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga&piyo=moge#frag');
        l.paramString().should.equal('?hoge=fuga&piyo=moge');
    });

    it('should be got parameter string when url that is omitted protocol is given', function () {
        var l = new LocationUtil('example.com:3000/foo/bar?hoge=fuga&piyo=moge#frag');
        l.paramString().should.equal('?hoge=fuga&piyo=moge');
    });

    it('should be got parameter string when url that is omitted port is given', function () {
        var l = new LocationUtil('http://example.com/foo/bar?hoge=fuga&piyo=moge#frag');
        l.paramString().should.equal('?hoge=fuga&piyo=moge');
    });

    it('should be got parameter string when url that is omitted path is given', function () {
        var l = new LocationUtil('http://example.com:3000?hoge=fuga&piyo=moge#frag');
        l.paramString().should.equal('?hoge=fuga&piyo=moge');
    });

    it('should be got parameter string when url that is omitted hash fragment is given', function () {
        var l = new LocationUtil('http://example.com:3000/foo/bar?hoge=fuga&piyo=moge');
        l.paramString().should.equal('?hoge=fuga&piyo=moge');
    });

    it('should be got parameter string when minimal url is given', function () {
        var l = new LocationUtil('example.com?hoge=fuga&piyo=moge');
        l.paramString().should.equal('?hoge=fuga&piyo=moge');
    });

    it('should be got parameter string when with search()', function () {
        var l = new LocationUtil('http://example.com?foo=bar');
        l.paramString().should.equal('?foo=bar');
        l.search('buz', 'qux');
        l.paramString().should.equal('?foo=bar&buz=qux');
    });
});

