const chalk = require('chalk');

//---FUNCION PARA OBTENER LA CANTIDAD TOTAL DE LINKS UNICOS---//
const uniqueLinks = (arrObj) => {
    const arrUniqueLinks = [];
    const arrUrls = [];
    arrObj.forEach((obj) => arrUrls.push(obj.href));
    arrUrls.forEach((url) => {
    if (!arrUniqueLinks.includes(url)) {
        arrUniqueLinks.push(url);
    }
});
    return arrUniqueLinks.length;
};

const arrayTemplate = (arrayLinks) => {
    console.log(chalk.magenta.bold(`\n |     ✿ FOUND lINKS: ✿    | \n`));
    arrayLinks.forEach(link => {
        console.log(chalk.yellowBright.bold(` ▷ href:  ${chalk.cyan(link.href)}   \n ▷ text:  ${chalk.magenta(link.text)} \n ▷ fileName: ${chalk.blackBright(link.fileName)} \n ❀`));
    })
};

const statusTemplate = (arrayLinks) => {
    console.log(chalk.magenta.bold(`| ✿ LINK STATUS: ✿ |`));
    arrayLinks.forEach(link => {
        if (link.status === 200) {
            console.log(chalk.yellowBright.bold(`▷ href: ${chalk.cyan(link.href)} \n▷ status: ${chalk.cyanBright.bold(link.status)} \n▷ ok: ${chalk.magentaBright.bold(link.ok)}\n `));
        } else {
            console.log(chalk.yellowBright.bold(`▷ href: ${chalk.cyan(link.href)} \n▷ status: ${chalk.cyanBright.bold(link.status)} \n▷ fail: ${chalk.redBright.bold(link.fail)}\n ❀ \n`));
        }
    })
}

const totalLinks = (arraylinks) => {
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    const brokenLinks = arraylinks.filter(link => link.status != 200)
    return `${chalk.magenta.bold(`
    |  ✿   STATS  ✿  |
            `)}
    ${chalk.yellowBright.bold(`\t▷ Total:${totalArray.length} \n\t▷ Unique:${uniqueLinks.length}\n\t▷ Broken:${brokenLinks.length} ❀ `)}
    `
};

module.exports = {
    arrayTemplate,
    statusTemplate,
    totalLinks,
    uniqueLinks,
}
