var LocationUtil = (function () {
    'use strict';

    function LocationUtil(url) {
        this.url = url;

        this._regexpProtocol = new RegExp('^([^:]+)://');
        this._regexpHost = new RegExp('^(?:([^:]+)://)?([^/]+)/?');
    }

    LocationUtil.prototype.absUrl = function () {
        return this.url;
    };

    LocationUtil.prototype.protocol = function () {
        var matches = this.url.match(this._regexpProtocol);

        if (matches === null) {
            return null;
        }

        return matches[1];
    };

    LocationUtil.prototype.host = function () {
        var matches = this.url.match(this._regexpHost);

        if (matches === null) {
            return null;
        }

        return matches[2];
    };

    return LocationUtil;
}());

this.LocationUtil = LocationUtil;
