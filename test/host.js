var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#host', function () {
    it('should get host rightly', function () {
        var l = new LocationUtil('http://example.com');
        l.host().should.equal('example.com');
    });

    it('should get host without protocol', function () {
        var l = new LocationUtil('example.com');
        l.host().should.equal('example.com');
    });

    it('should get host with paths and queries', function () {
        var l = new LocationUtil('http://example.com/foo?bar=buz');
        l.host().should.equal('example.com');
    });

    it('should get null when host is empty', function () {
        var l = new LocationUtil('');
        should.equal(l.host(), null);
    });
});

