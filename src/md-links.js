const mdLinks = (args) => {
    console.log("Argumentos desde MD :", args);
    
    const fs = require('fs'); // function system
    const path = require('path');

   //Resolve la ruta de relativa a absoluta
    const pathArgument = args[2];
    const pathArgAbsolut = path.resolve(pathArgument).normalize();
    
    console.log('Esto es el PATH ABSOLUT: ', pathArgAbsolut);

    fs.stat(pathArgAbsolut, (err, stats) => {
        if (err) throw err;
        // console.log(`stats: ${JSON.stringify(stats)}`);
        console.log('soy directorio?', stats.isDirectory());
        });
    
}

module.exports = mdLinks;
// 
// const process = require('process'); // Provee la informacion y tiene control sobre el proceso de Node.js
// const path = require('path'); // 


// // captura de argumentos desde la terminal
// const args = process.argv;
// // console.log(args);
// // console.log('number of arguments is '+ args.length + ' index 2 ' +args[2]);
// // console.log(process.argv) // Captura el valor de los argumentos

// //Resolve la ruta de relativa a absoluta
// const  pathArgument = path.resolve(args[2]);
// console.log(path.normalize(pathArgument));
// // Lee el contenido de los archivos
// fs.readFile(path.normalize(pathArgument), 'utf8', function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });

// // obtiene la extensión del archivo
// const pathExt = path.extname('prueba.md');
// // console.log('es un archivo '+ pathExt);

// //Obtiene la ruta absoluta del directorio y del archivo actual
// const dirName = path.dirname(__dirname); //__dirname archivo actual
// const fileName = path.dirname(__filename);//__filename archivo actual
// console.log('directory-name :', dirName, 'file-name :', fileName);
// // module.exports = () => {
// //   // ...
// // };