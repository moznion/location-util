var LocationUtil = (function () {
    'use strict';

    function LocationUtil(url) {
        this.url = url;
    }

    LocationUtil.prototype.absUrl = function () {
        return this.url;
    };

    return LocationUtil;
}());

this.LocationUtil = LocationUtil;
