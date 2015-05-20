# thebroonline.com

Fun project for tracking the use of broon sauce at chippies.

[![Build Status](https://img.shields.io/travis/neocotic/thebroonline.com/develop.svg)](https://travis-ci.org/neocotic/thebroonline.com)
[![Dependency Status](https://img.shields.io/gemnasium/neocotic/thebroonline.com.svg)](https://gemnasium.com/neocotic/thebroonline.com)

## Install

Before you can install the website locally you'll need to install the following prerequisites first:

- [git](http://git-scm.com)
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
    <td>GOOGLE_ANALYTICS_ID</td>
    <td><em>Optional</em></td>
  </tr>
  <tr>
    <td>GOOGLE_MAPS_API_KEY</td>
    <td><em>Optional</em></td>
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
$ git clone https://github.com/neocotic/thebroonline.com.git thebroonline.com
$ cd thebroonline.com
$ npm install
```

## Running

You just need to run the following command;

``` bash
$ node index.js
```

## Contributing

If you want to contribute to the website (legend!), please make sure you read through the following documentation first;

https://raw.githubusercontent.com/neocotic/thebroonline.com/master/CONTRIBUTING.md

## Bugs

If you have any problems with the website or would like to see the changes currently in development you can do so here;

https://github.com/neocotic/thebroonline.com/issues
