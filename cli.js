#!/usr/bin/env node
require('@babel/register')({
  root: __dirname,
  ignore: [
    /node_modules\/(?!@txo)/,
  ],
  cache: true,
})
require('./lib')
