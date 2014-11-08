location-util [![Build Status](https://travis-ci.org/moznion/location-util.svg)](https://travis-ci.org/moznion/location-util)
==

Utilities of location (URL) for browser and node. It has no dependencies.

Synopsis
--

```javascript
var l = new LocationUtil('http://example.com:3000/foo?bar=buz#FRAG');
l.protocol(); // => 'http'
l.host();     // => 'example.com'
l.port();     // => 3000
l.search();   // => {'bar': 'buz'}
l.hash();     // => 'FRAG'
l.path();     // => '/foo'
l.url();      // => '/foo?bar=buz#FRAG'
```

Methods
--

TBD

Author
--

moznion (<moznion@gmail.com>)

License
--

MIT
