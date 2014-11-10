var LocationUtil = (function () {
    'use strict';

    var regexp = new RegExp('^(?:([^:]+)://)?([^/:#?]+)?(?::([0-9]+))?(/[^#?]*)?(?:[?]([^#]+))?(?:[#](.+))?$');
    //                            ~~~~~       ~~~~~~       ~~~~~~    ~~~~~~~         ~~~~~          ~~
    //                              |           |            |- port    |              |             |- hash
    //                              |           |- host                 |              |- queries
    //                              |- protocol                         |- paths

    function parseParams(url) {
        var matches = url.match(regexp);

        var Params = (function () {
            function Params() {
                this.kv = {};
            }

            Params.prototype.add = function (key, value) {
                this.kv[key] = value;
            };

            Params.prototype.delete = function (key) {
                delete this.kv[key];
            };

            Params.prototype.get = function () {
                return this.kv;
            };

            Params.prototype.toString = function () {
                var keys = Object.keys(this.kv);
                var numOfKeys = keys.length;
                var paramStrings = [];
                var i, key, value;
                for (i = 0; i < numOfKeys; i++) {
                    key = keys[i];
                    value = this.kv[key];
                    paramStrings.push(key + '=' + value);
                }

                var paramString = paramStrings.join('&');
                if (paramString !== '') {
                    paramString = '?' + paramString;
                }

                return paramString;
            };

            return Params;
        }());

        var params = new Params();

        if (matches === null) {
            return params;
        }

        var paramStr = matches[5];
        if (typeof paramStr === 'undefined') {
            return params;
        }

        var queries = paramStr.split('&');
        var numOfQueries = queries.length;
        var i, query, kv;
        for (i = 0; i < numOfQueries; i++) {
            query = queries[i];

            kv = query.split('=');
            if (kv.length < 2) {
                continue;
            }

            params.add(kv.shift(), kv.join(''));
        }

        return params;
    }

    function parsePath (url) {
        var matches = url.match(regexp);

        if (matches === null) {
            return '/';
        }

        var path = matches[4];
        if (typeof path === 'undefined') {
            return '/';
        }

        return path;
    }

    function  parseHash(url) {
        var matches = url.match(regexp);

        if (matches === null) {
            return '';
        }

        var hashFragment = matches[6];
        if (typeof hashFragment === 'undefined') {
            return '';
        }

        return hashFragment;
    }

    function LocationUtil(url) {
        this._protocol = '';
        this._host = '';
        this._port = null;

        this._params = parseParams(url);
        this._path = parsePath(url);
        this._hashFragment = parseHash(url);

        var matches = url.match(regexp);

        if (typeof matches[1] !== 'undefined') {
            this._protocol = matches[1];
        }

        if (typeof matches[2] !== 'undefined') {
            this._host = matches[2];
        }

        if (typeof matches[3] !== 'undefined') {
            this._port = parseInt(matches[3], 10);
        }
    }

    function buildURLPath (self) {
        var url = '';
        if (self._path !== '') {
            url += self._path;
        }

        url += self._params.toString();

        if (self._hashFragment !== '') {
            url += '#' + self._hashFragment;
        }

        return url;
    }

    LocationUtil.prototype.absUrl = function () {
        var url = '';

        if (this._protocol !== '') {
            url = this._protocol + '://';
        }

        url += this._host;

        if (this._port !== null) {
            url += ':' + this._port;
        }

        url += buildURLPath(this);

        return url;
    };

    LocationUtil.prototype.protocol = function () {
        return this._protocol;
    };

    LocationUtil.prototype.host = function () {
        return this._host;
    };

    LocationUtil.prototype.port = function () {
        return this._port;
    };

    LocationUtil.prototype.search = function () {
        var numOfArguments = arguments.length;

        if (numOfArguments) {
            // for setter behavior

            var key, value;
            for (var i = 0; i < numOfArguments; i += 2) {
                key = arguments[i];
                value = arguments[i+1];
                if (typeof key === 'undefined' || typeof value === 'undefined') {
                    continue;
                }

                if (value === null) {
                    this._params.delete(key);
                    continue;
                }

                this._params.add(key, value);
            }

            if (numOfArguments % 2 !== 0) {
                var e = new Error('Odd number of arguments are given');
                console.log(e.message);
            }

            return this;
        }

        // for getter behavior
        return this._params.get();
    };

    LocationUtil.prototype.paramString = function () {
        return this._params.toString();
    }

    LocationUtil.prototype.path = function () {
        var numOfArguments = arguments.length;

        if (numOfArguments) {
            var path = arguments[0];
            if (path[0] !== '/') {
                path = '/' + path;
            }

            this._path = path;

            return this;
        }

        // for getter behavior
        return this._path;
    };

    LocationUtil.prototype.hash = function () {
        var numOfArguments = arguments.length;

        if (numOfArguments) {
            this._hashFragment = arguments[0];
            return this;
        }

        return this._hashFragment;
    };

    LocationUtil.prototype.url = function () {
        var numOfArguments = arguments.length;

        if (numOfArguments) {
            var url = arguments[0];

            if (url[0] !== '/') {
                url = '/' + url;
            }

            this._params = parseParams(url);
            this._path = parsePath(url);
            this._hashFragment = parseHash(url);

            return this;
        }

        return buildURLPath(this);
    };

    return LocationUtil;
}());

this.LocationUtil = LocationUtil;

