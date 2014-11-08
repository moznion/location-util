var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;


describe('#port', function () {
    it('should get port rightly', function () {
        var l = new LocationUtil('http://example.com:8080/foo?bar=buz');
        l.port().should.equal(8080);
    });

    it('should get port rightly without protocol and paths', function () {
        var l = new LocationUtil('example.com:8080');
        l.port().should.equal(8080);
    });

    it('should get nil string if port is empty', function () {
        var l = new LocationUtil('http://example.com');
        l.port().should.equal("");
    });
});

