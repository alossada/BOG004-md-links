//-----Importamos Modulos de Node----//
const{
    converterPath,
    validatePath,
    isDir,
    readFileContent,
    readDirFiles,
} = require('./node-methods.js')

//-----Funcion Mdlinks-----//
const mdLinks = (args) => new Promise ((resolve, reject) =>{
    const path = require('path');

    //Capturar ruta desde los argumentos
    const pathArgument = args[2];
    console.log('esto es el PATH ARGUMENT :', pathArgument);
    console.log('Es ruta ABSOLUTA? :', path.isAbsolute(pathArgument));

    //-----Convierte la ruta capturada en Absoluta-----//
    const pathArgAbsolut = converterPath(pathArgument);
    console.log('Esto es el PATH ABSOLUT: ', pathArgAbsolut);

    //Invoca funcion validatePath
    const validatePathResult = validatePath(pathArgAbsolut);
    console.log('La ruta es VALIDA? :', validatePathResult);

    //Condicional para validar ruta
    if(validatePathResult){ //ingresa solo si la ruta es valida
        console.log('Hola Margaret', isDir(pathArgAbsolut));
        isDir(pathArgAbsolut)
        .then((isDirResult) => {
            console.log(isDirResult);
            if(isDirResult){
                console.log('Revisar recursividad')
                const dirFiles = readDirFiles(pathArgAbsolut);
                resolve(Promise.all(dirFiles));
            }else{
                console.log('Lectura del archivo, es ELSE');
                const fileContent = readFileContent(pathArgAbsolut);// se debe revisar si es MD
                resolve(fileContent);
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }else{
        console.log('Else de ruta no valida');
        const invalidPath = 'Ruta no valida';
        reject(new Error(invalidPath));
    }
});


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