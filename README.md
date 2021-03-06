oncoprint.js
============

Home of the OncoPrint visualization as used on the [cBioPortal](www.cbioportal.org).

## Latest Build

Download the latest build here (TODO).

## Setup

1. Install `nodejs`. `npm` is bundled together with `nodejs`. `nodejs` is almost certainly provided by your favorite package manager or you can find it [here][nodejs]. Here is a [blog post][install-npm] from people at nodejs with a bit more detail.
2. Install gulp globally:
```sh
    npm install --global gulp
```
This is not exactly a perfect solution to getting the gulp binary into your `PATH` but it seems to be a standard followed by many. Not to fear, gulp knows how to resolve version mismatch between global and local (i.e. what is specified in `package.json`) versions.

3. Run `npm install` to install the dependencies as described in `package.json`.

## Build

Run `gulp spec && gulp` to run unit tests and generate a minified artifact in `dist/prod`.

## Tests

Run `gulp spec` for unit tests.

Run `gulp test` to run both unit tests and to build development environment in `dist/test`. Run your favorite lightweight static resource server from `dist/test`. I use [http-server][http-server] because I've found it to be faster and more reliable than `python -m SimpleHttpServer`. You should be able to navigate your browser to wherever your local server is running ([http://localhost:8080](http://localhost:8080) is likely) and see some sample OncoPrints.

## Development

While developing, I recommend using

```gulp watch```

This will run `gulp test` every time a source file is modified.

[nodejs]:https://nodejs.org/
[http-server]:https://github.com/indexzero/http-server
[install-npm]:http://blog.npmjs.org/post/85484771375/how-to-install-npm
