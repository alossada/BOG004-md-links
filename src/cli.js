#!/usr/bin/env node
const mdLinks = require('./index.js');
const process = require('process');

const allArguments = process.argv;

const cli = () => {
    mdLinks(allArguments)
    .then((response) => {
        console.log(response)
    })
    .catch((e) => {
        console.log(e)
    })
};

cli();