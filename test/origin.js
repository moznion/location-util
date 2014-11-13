var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#origin()', function () {
    it('should get origin', function () {
        var l = new LocationUtil('http://example.com:8080/foo?bar=buz#frag');
        l.origin().should.equal('http://example.com:8080');
    });

    it('should get origin which is omitted scheme', function () {
        var l = new LocationUtil('example.com:8080/foo?bar=buz#frag');
        l.origin().should.equal('example.com:8080');
    });

    it('should get origin which is omitted port', function () {
        var l = new LocationUtil('http://example.com/foo?bar=buz#frag');
        l.origin().should.equal('http://example.com');
    });

    it('should get origin which is omitted scheme and port', function () {
        var l = new LocationUtil('example.com/foo?bar=buz#frag');
        l.origin().should.equal('example.com');
    });

    it('should be pass on complex behavior', function () {
        var l = new LocationUtil('http://example.com:3000/foo?bar=buz#frag');
        l.url('/user?id=123#name').origin().should.equal('http://example.com:3000');
        l.path('/entry').origin().should.equal('http://example.com:3000');
        l.search('date', '20140401', 'id', null).origin().should.equal('http://example.com:3000');
        l.hash('').origin().should.equal('http://example.com:3000');
    });
});

