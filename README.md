# broon line

Fun project for tracking the use of broon sauce at chippies.

[![Build Status](https://img.shields.io/travis/Skelp/broonline/develop.svg?style=flat-square)](https://travis-ci.org/Skelp/broonline)
[![Dependency Status](https://img.shields.io/david/Skelp/broonline.svg?style=flat-square)](https://david-dm.org/Skelp/broonline)
[![Dev Dependency Status](https://img.shields.io/david/dev/Skelp/broonline.svg?style=flat-square)](https://david-dm.org/Skelp/broonline#info=devDependencies)

## Install

Before you can install the website locally you'll need to install the following prerequisites first:

- [Git](http://git-scm.com)
- [Node.js](https://nodejs.org) (at least v0.12)
- [Bower](http://bower.io)
- [Grunt](http://gruntjs.com)
- [mongoDB](https://www.mongodb.org)

Once you have mongoDB running locally, create a user with read/write access for a database which will be used by this
website.

You'll need to have the following environment variables set;

<table>
  <tr>
    <th>Name</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>MONGOLAB_URI</td>
    <td>mongodb://username:password@localhost:27017/database</td>
  </tr>
  <tr>
    <td>NEW_RELIC_APP_NAME</td>
    <td>thebroonline</td>
  </tr>
  <tr>
    <td>NEW_RELIC_LOG</td>
    <td>stdout</td>
  </tr>
  <tr>
    <td>NEW_RELIC_LOG_LEVEL</td>
    <td>info</td>
  </tr>
  <tr>
    <td>SESSION_SECRET</td>
    <td>secret</td>
  </tr>
</table>

Once you've done all of that, you can just checkout the code and then install it with the following commands;

``` bash
$ git clone https://github.com/Skelp/broonline.git
$ cd broonline
$ npm install
```

## Running

You just need to run the following command;

``` bash
$ node index.js
```

## Contributing

If you want to contribute to the website (legend!), please make sure you read through the following documentation first;

https://github.com/Skelp/broonline/raw/master/CONTRIBUTING.md

## Bugs

If you have any problems with the website or would like to see the changes currently in development you can do so here;

https://github.com/Skelp/broonline/issues

## License

See [LICENSE.md](https://github.com/Skelp/broonline/raw/master/LICENSE.md) for more information on our MIT license.

© 2016 [Skelp](http://skelp.io)
<img align="right" width="16" height="16" src="https://raw.githubusercontent.com/Skelp/skelp-branding/master/assets/logo/base/skelp-logo-16x16.png">
