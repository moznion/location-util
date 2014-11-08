var LocationUtil = (function () {
    'use strict';

    function LocationUtil(url) {
        this.url = url;

        this._regexpProtocol = new RegExp('^([^:]+)://');
        this._regexpHost = new RegExp('^(?:([^:]+)://)?([^/]+)/?');
        this._regexpPort = new RegExp('^(?:([^:]+)://)?[^/]+?:([0-9]+)/?');
    }

    LocationUtil.prototype.absUrl = function () {
        return this.url;
    };

    LocationUtil.prototype.protocol = function () {
        var matches = this.url.match(this._regexpProtocol);

        if (matches === null) {
            return null;
        }

        var protocol = matches[1];
        if (typeof protocol === 'undefined') {
            return null;
        }
        return protocol;
    };

    LocationUtil.prototype.host = function () {
        var matches = this.url.match(this._regexpHost);

        if (matches === null) {
            return null;
        }

        var host = matches[2];
        if (typeof host === 'undefined') {
            return null;
        }
        return host;
    };

    LocationUtil.prototype.port = function () {
        var matches = this.url.match(this._regexpPort);

        if (matches === null) {
            return null;
        }

        var port = matches[2];
        if (typeof port === 'undefined') {
            return null;
        }
        return parseInt(port, 10);
    }

    return LocationUtil;
}());

this.LocationUtil = LocationUtil;
