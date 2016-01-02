# template-directory
==================
[![NPM version][npm-image]][npm-url]
![][david-url]
![][travis-url]

Copies recursively the files from source directory to destination directory with [LoDash](http://lodash.com/docs#template)'s templating method.

## Installation

```bash
npm install template-directory --save-dev
```

## Usage

```javascript
var template = require('template-directory');

template('/tmp/mydir', '/tmp/mynewdir', {
    name: 'hello'
}, {
  templateOptions: {variable: 'data'}
});

//if you don't have settings, you can simply omit it
template('/tmp/mydir', '/tmp/mynewdir', {
    name: 'hello'
});

//if you have neither settings, nor data. Just leave them
template('/tmp/mydir', '/tmp/mynewdir');
```

#### template(source, destination[, data, settings]) ####

Copies recursively the files from source directory to destination directory.

- Copy file directly if it is binary
- Templating file if it is text file with [LoDash](http://lodash.com/docs#template)'s templating method

> `settings.clobber` defaults to true, overwrites destination files
> `settings.templateOptions` is [template-options](https://lodash.com/docs#template) just passed to `_.template`
> `data` is used to interpolated the text files

## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/template-directory/master/LICENSE)




[npm-url]: https://npmjs.org/package/template-directory
[npm-image]: https://badge.fury.io/js/template-directory.png
[david-url]: https://david-dm.org/leftstick/template-directory.png
[travis-url]:https://api.travis-ci.org/leftstick/template-directory.svg?branch=master
