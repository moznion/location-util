var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#protocol', function () {
    it('should get protocol', function () {
        var l = new LocationUtil('http://example.com/foo?bar=buz');
        l.protocol().should.equal('http');
    });

    it('should get null when protocol is empty', function () {
        var l = new LocationUtil('example.com/foo?bar=buz');
        should.equal(l.protocol(), null);
    });
});

