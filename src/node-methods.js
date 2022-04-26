//---Metodos de Node---//
const fs = require('fs'); // file system
const {resolve} = require('path');
const path = require('path'); 

//-----Resuelve y normaliza la ruta dada-----//
const converterPath = (pathToConvert) => {
    let pathToConvertResult;
    path.isAbsolute(pathToConvert) 
        ? pathToConvertResult = pathToConvert 
        : pathToConvertResult = path.resolve(pathToConvert).normalize();
    return pathToConvertResult;
    }

//-----Verifica si la ruta existe-----//
const validatePath = (path) => fs.existsSync(path);

//-----Verificar si es directorio---//
const isDir = (pathToCheck) => new Promise((resolve) =>{
    fs.stat(pathToCheck, (err, stats) => {
        if (err) throw err;
        const isDirResult = stats.isDirectory();
        console.log('Es DIRECTORIO? :', isDirResult);
        resolve(isDirResult);
    });
});

//-----Leer contenido de la ruta capturada------//
const readFileContent = (pathToRead) => {
    fs.readFile(pathToRead, 'utf8', function(err, data){
        if (err) throw err;
        console.log(data);
    });
};

//----- recorrer el contenido del directorio-----//
    const readDirFiles = (checkContentDir) => {
        const dirFiles = fs.readdirSync(checkContentDir);
        console.log(dirFiles);
        return dirFiles;
};

module.exports = {
    converterPath,
    validatePath,
    isDir,
    readFileContent,
    readDirFiles,
}