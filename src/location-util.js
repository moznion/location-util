var LocationUtil = (function () {
    'use strict';

    function LocationUtil(url) {
        var self = this;

        this._url = url;

        this._protocol = (function () {
            var matches = url.match('^([^:]+)://');

            if (matches === null) {
                return null;
            }

            var protocol = matches[1];
            if (typeof protocol === 'undefined') {
                return null;
            }
            return protocol;
        }());

        this._host = (function () {
            var matches = url.match('^(?:([^:]+)://)?([^/]+)/?');

            if (matches === null) {
                return null;
            }

            var host = matches[2];
            if (typeof host === 'undefined') {
                return null;
            }
            return host;
        }());

        this._port = (function () {
            var matches = url.match('^(?:([^:]+)://)?[^/]+?:([0-9]+)/?');

            if (matches === null) {
                return null;
            }

            var port = matches[2];
            if (typeof port === 'undefined') {
                return null;
            }
            return parseInt(port, 10);
        }());

        this._params = {};
        (function () {
            var matches = url.match('[?]([^#]+)');

            if (matches === null) {
                return;
            }

            var paramStr = matches[1];
            if (typeof paramStr === 'undefined') {
                return;
            }

            var queries = paramStr.split('&');
            var num_of_queries = queries.length;
            var i, query, kv, key, value;
            for (i = 0; i < num_of_queries; i++) {
                query = queries[i];

                kv = query.split('=');
                if (kv.length < 2) {
                    continue;
                }

                self._params[kv.shift()] = kv.join('');
            }
        }());

        this._path = (function () {
            var matches = url.match('^(?:([^:]+)://)?[^/]+(/?[^#?]*)');

            if (matches === null) {
                return '/';
            }

            var path = matches[2];
            if (typeof path === 'undefined' || path === '') {
                return '/';
            }

            return path;
        }());
    }

    LocationUtil.prototype.absUrl = function () {
        // TODO
        return this._url;
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
        var num_of_arguments = arguments.length;

        if (num_of_arguments) {
            // for setter behavior

            var key, value;
            for (var i = 0; i < num_of_arguments; i += 2) {
                key = arguments[i];
                value = arguments[i+1];
                if (typeof key === 'undefined' || typeof value === 'undefined') {
                    continue;
                }

                if (value === null) {
                    delete this._params[key];
                    continue;
                }

                this._params[key] = value;
            }

            if (num_of_arguments % 2 != 0) {
                new Error('Odd number of arguments are given');
            }

            return this;
        }

        // for getter behavior
        return this._params;
    };

    LocationUtil.prototype.path = function () {
        var num_of_arguments = arguments.length;

        if (num_of_arguments) {
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

    return LocationUtil;
}());

this.LocationUtil = LocationUtil;

