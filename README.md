location-util [![NPM version](https://badge.fury.io/js/location-util.svg)](https://www.npmjs.org/package/location-util) [![Build Status](https://travis-ci.org/moznion/location-util.svg)](https://travis-ci.org/moznion/location-util)
==

Utilities of location (URL) for browser and node. It has no dependencies.

Synopsis
--

```javascript
var l = new LocationUtil('http://example.com:3000/foo?bar=buz#frag');
l.protocol();    // => 'http'
l.host();        // => 'example.com'
l.port();        // => 3000
l.search();      // => {'bar': 'buz'}
l.paramString(); // => '?bar=buz'
l.hash();        // => 'frag'
l.path();        // => '/foo'
l.url();         // => '/foo?bar=buz#frag'
l.origin();      // => 'http://example.com:3000'

l.url('/user?id=123#name').absUrl();               // => 'http://example.com:3000/user?id=123#name'
l.path('/entry').absUrl();                         // => 'http://example.com:3000/entry?id=123#name'
l.search('date', '20140401', 'id', null).absUrl(); // => 'http://example.com:3000/entry?date=20140401#name'
l.hash('').absUrl();                               // => 'http://example.com:3000/entry?date=20140401'
```

Description
--

This module parse URL and create object.
Object provides some getter and setter methods.
It makes you to get URL or a part of that.
And also you can rewrite and reconstruct URL via object.

This module is inspired by `$location` of [Angular.js](https://angularjs.org/).

This module has no dependencies.
And it is available to use on browser and node.

Installation
--

### npm

```
$ npm install location-util
```

### bower

```
$ bower install location-util
```

Methods
--

- `new Locationutil(url)`

Creates an instance. It takes `url` as string.

- `absUrl()`

This method provides getter only.

It returns full URL.

- `protocol()`

This method provides getter only.

It returns protocol (e.g. `http`). If protocol is empty, it returns blank string.

- `host()`

This method provides getter only.

It returns the part of host.

- `port()`

This method provides getter only.

It returns port number. If port number is empty, it returns `null`.

- `search([queries])`

This method provides getter and setter.

If you use this method without any arguments, this method behave as getter. It returns the query as object (e.g. `{'bar': 'buz'}`).
If query is empty, it returns blank object.

The another case, this method behave as setter. It changes query according to arguments and returns changed instance.
If value of queries is null, the property specified via the first argument will be deleted.

```javascript
var l = new LocationUtil('http://example.com?foo=bar');
l.search(); // => {'foo': 'bar'}
l.search('buz', 'qux');
l.search(); // => {'foo': 'bar', 'buz': 'qux'}
l.search('foo', null);
l.search(); // => {'buz': 'qux'}
```

- `paramString()`

This method provides getter only.

This method returns query parameter string like a `?foo=bar&buz=qux`. This method __doesn't__ ensure the order of key-values.

```javascript
var l = new LocationUtil('http://example.com?foo=bar');
l.paramString(); // => '?foo=bar'
l.search('buz', 'qux');
l.paramString(); // => '?foo=bar&buz=qux'
```

- `path(pathString)`

This method provides getter and setter.

If you use this method without any arguments, this method behave as getter. It returns the part of path (e.g. `/foo/bar`).
If path is empty, it returns '/'.

The another case, this method behave as setter. It changes path according to arguments and returns changed instance.
Path should always begin with forward slash ('/'), this method will add the forward slash if it is missing.

```javascript
var l = new LocationUtil('http://example.com/foo');
l.path(); // => '/foo'
l.path('/bar/buz');
l.path(); // => '/bar/buz'
```

- `hash(hashString)`

This method provides getter and setter.

If you use this method without any arguments, this method behave as getter. It returns the part of hash fragment.
If hash is empty, it returns blank string.

The another case, this method behave as setter. It changes hash fragment according to arguments and returns changed instance.

```javascript
var l = new LocationUtil('http://example.com#foo');
l.hash(); // => 'foo'
l.hash('bar');
l.hash(); // => 'bar'
```

- `url(urlString)`

This method provides getter and setter.

If you use this method without any arguments, this method behave as getter. It returns the URL (e.g. /foo?bar=buz#frag).
If URL is empty, it returns blank string.

The another case, this method behave as setter. It changes URL according to arguments and returns changed instance.
URL should always begin with forward slash ('/'), this method will add the forward slash if it is missing.

```javascript
var l = new LocationUtil('http://example.com/foo?bar=buz#frag');
l.url(); // => '/foo?bar=buz#frag'
l.url('/user?id=123#name');
l.url(); // => '/user?id=123#name'
```

- `origin()`

This method provides only getter.

This method returns a string like so `<protocol>://<host>:<port>`.
If underlying URL doesn't have `protocol` or `port`,
it will omit them from result.

```javascript
var l = new LocationUtil('http://example.com:3000/foo?bar=buz#frag');
l.origin(); // => 'http://example.com:3000'

l = new LocationUtil('http://example.com/foo?bar=buz#frag');
l.origin(); // => 'http://example.com'
```

See Also
--

[micro-location.js](https://github.com/cho45/micro-location.js/)

It's just simple and awesome library!

location-util has some additional functions than this,
but if you don't need them, please try micro-location.js.

Author
--

moznion (<moznion@gmail.com>)

License
--

MIT

