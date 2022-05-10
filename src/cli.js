#!/usr/bin/env node
const mdLinks = require('./index.js');
const process = require('process');
const chalk = require('chalk');
const { arrayTemplate, statusTemplate, totalLinks, linkStats } = require("./stats.js");

const arguments = process.argv.slice(2);

switch (arguments.length) {
    case 0:
        console.log(chalk.redBright.bold('| ✿ PLEASE, ENTER A PATH ✿ |'));
        break;
    case 1:
        //console.log('argumento[0]', arguments[0]);
        mdLinks(arguments[0], { validate: false })
            .then((response) => {
                (console.log(`${arrayTemplate(response)}`));
            })
            .catch(                               
                (err) => console.log(chalk.redBright.bold(err)));
        break;
    case 2:
        //console.log('argumento[1]', arguments[1]);
        if (arguments[1] === '--validate') {
            // console.log('argumento[0]', arguments[0]);
            mdLinks(arguments[0], { validate: true })
                .then((response) => {
                    console.log(`${statusTemplate(response)}`);
                })
                .catch((err) => console.log(chalk.redBright.bold(err)));
        } else if (arguments[1] === '--stats') {
            mdLinks(arguments[0], { validate: true })
                .then((response) => {
                    console.log(`${linkStats(response)}`);
                })
                .catch((err) => console.log(chalk.redBright.bold(err)));
        }
        // else if (argumentos[1] === '--help') {
        //   console.log(chalk.cyan.bold(help));
        // } 
        else console.log(chalk.redBright.bold('| ✿ INVALID OPTION ✿ |'));
        break;
    case 3:
        if ((arguments[1] === '--validate' && arguments[2] === '--stats') || (arguments[1] === '--stats' && arguments[2] === '--validate')) {
            mdLinks(arguments[0], { validate: true })
                .then(response => {
                    console.log(`${totalLinks(response)}`);
                })
                .catch((err) => console.log(chalk.redBright.bold(err)));
        } else console.log(chalk.redBright.bold('| ✿ INVALID OPTIONS ✿ |'));
        break;
    default:
        console.log(chalk.redBright.bold('| ✿ INCORRECT DATA INPUT ✿ |'));
}