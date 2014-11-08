var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#search', function () {
    describe('with no arguments (getter)', function () {
        it('should get parameters', function () {
            var l = new LocationUtil('http://example.com/foo?bar=buz&hoge=fuga#frag');
            l.search().should.deep.equal({
                'bar': 'buz',
                'hoge': 'fuga'
            });
        });

        it('should be empty object', function () {
            var l = new LocationUtil('http://example.com/foo');
            l.search().should.deep.equal({});
        });
    });

    describe('with arguments (setter)', function () {
        it('should set parameters successfully', function () {
            var l = new LocationUtil('http://example.com/foo?bar=buz&hoge=fuga#frag');
            var changed = l.search('piyo', 'piyopiyo');
            changed.search().should.deep.equal({
                'bar': 'buz',
                'hoge': 'fuga',
                'piyo': 'piyopiyo'
            });
        });

        it('should set parameters successfully', function () {
            var l = new LocationUtil('http://example.com/foo?bar=buz&hoge=fuga#frag');
            var changed = l.search('hoge', null);
            changed.search().should.deep.equal({
                'bar': 'buz'
            });
        });

        it('odd arguments are given', function () {
            var l = new LocationUtil('http://example.com/foo?bar=buz&hoge=fuga#frag');
            var changed = l.search('hoge', 'piyo', 'bar');
            changed.search().should.deep.equal({
                'hoge': 'piyo',
                'bar': 'buz'
            });
        });
    });
});

