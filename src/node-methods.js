//---Metodos de Node---//
const fs = require('fs'); // file system
const path = require('path'); 

//---Resuelve y normaliza la ruta dada---//
const converterPath = (pathToConvert) => {
    let pathToConvertResult;
    path.isAbsolute(pathToConvert) 
        ? pathToConvertResult = pathToConvert 
        : pathToConvertResult = path.resolve(pathToConvert).normalize();
    return pathToConvertResult;
    }

//---Verifica si la ruta existe---//
const validatePath = (path) => fs.existsSync(path);

//---Verificar si es directorio---//
const isDir = (pathToCheck) => new Promise((resolve) =>{
    fs.stat(pathToCheck, (err, stats) => {
        if (err) throw err;
        const isDirResult = stats.isDirectory();
        console.log('Es DIRECTORIO? :', isDirResult);
        resolve(isDirResult);
    });
});

//--- recorrer el contenido del directorio---//
const readDirFiles = (checkContentDir) => {
    const dirFiles = fs.readdirSync(checkContentDir);
    console.log(dirFiles);
    return dirFiles;
};

//---Revisar la extencion del archivo---//
const fileExtension = (filePath) => {
    const extension = path.extname(filePath);
    return extension;
}

//-----Leer contenido de un archivo------//
const readFileContent = (pathToRead) => {
    fs.readFile(pathToRead, 'utf8', function(err, data){
        if (err) throw err;
        console.log(data);
    });
}

//---Revisa si es archivo .md---//
const isFileMd = (filePath) => {
    const fileExtensionResult = fileExtension(filePath);
    if(fileExtensionResult === '.md'){
        return filePath;
    }else{
        const isFileMdError = 'No contiene archivos .md';
        return isFileMdError;
    }
};

module.exports = {
    converterPath,
    validatePath,
    isDir,
    readFileContent,
    readDirFiles,
    isFileMd,
}