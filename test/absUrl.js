var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#absUrl()', function () {
    it('should get full URL', function () {
        var l = new LocationUtil('http://example.com:8080/foo?bar=buz#frag');
        l.absUrl().should.equal('http://example.com:8080/foo?bar=buz#frag');
    });

    it('documents behavior', function () {
        var l = new LocationUtil('http://example.com:3000/foo?bar=buz#frag');
        l.url('/user?id=123#name').absUrl().should.equal('http://example.com:3000/user?id=123#name');
        l.path('/entry').absUrl().should.equal('http://example.com:3000/entry?id=123#name');
        l.search('date', '20140401', 'id', null).absUrl().should.equal('http://example.com:3000/entry?date=20140401#name');
        l.hash('').absUrl().should.equal('http://example.com:3000/entry?date=20140401');
    });
});

