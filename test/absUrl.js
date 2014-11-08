var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

var l = new LocationUtil('http://example.com/foo?bar=buz');

describe('#absUrl', function () {
    it('should get full URL', function () {
        l.absUrl().should.equal('http://example.com/foo?bar=buz');
    });
});

