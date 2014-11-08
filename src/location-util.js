var LocationUtil = (function () {
    'use strict';

    function LocationUtil(url) {
        this.url = url;

        this._regexpProtocol = new RegExp('^([^:]+)://');
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

    return LocationUtil;
}());

this.LocationUtil = LocationUtil;
