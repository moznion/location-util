var LocationUtil = (function () {
    'use strict';

    function LocationUtil(url) {
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
    }

    return LocationUtil;
}());

this.LocationUtil = LocationUtil;
