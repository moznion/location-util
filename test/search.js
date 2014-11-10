var should = require('chai').should();

var LocationUtil = require('../src/location-util.js').LocationUtil;

describe('#search', function () {
    describe('with no arguments (getter)', function () {
        describe('when parameters exist', function () {
            it('should be got query parameters when full url is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo?bar=buz&hoge=fuga#frag');
                l.search().should.deep.equal({
                    'bar': 'buz',
                    'hoge': 'fuga'
                });
            });

            it('should be got query parameters when url that is omitted protocol is given', function () {
                var l = new LocationUtil('example.com:3000/foo?bar=buz&hoge=fuga#frag');
                l.search().should.deep.equal({
                    'bar': 'buz',
                    'hoge': 'fuga'
                });
            });

            it('should be got query parameters when url that is omitted port is given', function () {
                var l = new LocationUtil('http://example.com/foo?bar=buz&hoge=fuga#frag');
                l.search().should.deep.equal({
                    'bar': 'buz',
                    'hoge': 'fuga'
                });
            });

            it('should be got query parameters when url that is omitted path is given', function () {
                var l = new LocationUtil('http://example.com:3000?bar=buz&hoge=fuga#frag');
                l.search().should.deep.equal({
                    'bar': 'buz',
                    'hoge': 'fuga'
                });
            });

            it('should be got query parameters when url that is omitted hash fragment is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo?bar=buz&hoge=fuga');
                l.search().should.deep.equal({
                    'bar': 'buz',
                    'hoge': 'fuga'
                });
            });

            it('should be got query parameters when minimal url is given', function () {
                var l = new LocationUtil('example.com?bar=buz&hoge=fuga');
                l.search().should.deep.equal({
                    'bar': 'buz',
                    'hoge': 'fuga'
                });
            });
        });

        describe('when parameters do not exist', function () {
            it('should be got empty object when full url is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo#frag');
                l.search().should.deep.equal({});
            });

            it('should be got empty object when url that is omitted protocol is given', function () {
                var l = new LocationUtil('example.com:3000/foo#frag');
                l.search().should.deep.equal({});
            });

            it('should be got empty object when url that is omitted port is given', function () {
                var l = new LocationUtil('http://example.com/foo#frag');
                l.search().should.deep.equal({});
            });

            it('should be got empty object when url that is omitted path is given', function () {
                var l = new LocationUtil('http://example.com:3000#frag');
                l.search().should.deep.equal({});
            });

            it('should be got empty object when url that is omitted hash fragment is given', function () {
                var l = new LocationUtil('http://example.com:3000/foo');
                l.search().should.deep.equal({});
            });

            it('should be got empty object when minimal url is given', function () {
                var l = new LocationUtil('example.com');
                l.search().should.deep.equal({});
            });
        });
    });

    describe('with arguments (setter)', function () {
        it('should set parameters successfully', function () {
            var l = new LocationUtil('http://example.com/foo?bar=buz&hoge=fuga#frag');
            l.search('piyo', 'piyopiyo').search().should.deep.equal({
                'bar': 'buz',
                'hoge': 'fuga',
                'piyo': 'piyopiyo'
            });
        });

        it('should set parameters successfully', function () {
            var l = new LocationUtil('http://example.com/foo?bar=buz&hoge=fuga#frag');
            l.search('hoge', null).search().should.deep.equal({
                'bar': 'buz'
            });
        });

        it('odd arguments are given', function () {
            var l = new LocationUtil('http://example.com/foo?bar=buz&hoge=fuga#frag');
            l.search('hoge', 'piyo', 'bar').search().should.deep.equal({
                'hoge': 'piyo',
                'bar': 'buz'
            });
        });
    });
});

