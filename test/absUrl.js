var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;


describe('#absUrl', function () {
    it('should get full URL', function () {
        var l = new LocationUtil('http://example.com:8080/foo?bar=buz#frag');
        l.absUrl().should.equal('http://example.com:8080/foo?bar=buz#frag');
    });
});

