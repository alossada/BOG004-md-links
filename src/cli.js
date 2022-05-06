#!/usr/bin/env node
const mdLinks = require('./index.js');
const process = require('process');

const pathArg = process.argv[2]
const optionArg = {}

if (process.argv.includes('--validate')) {
    optionArg.validate = true;
}

// if (process.argv.includes('--stats')) {
//     optionsMd.stats = true;
// }


mdLinks(pathArg, optionArg)
.then((response) => {
    console.log(response)
})
.catch((e) => {
    console.log(e)
})