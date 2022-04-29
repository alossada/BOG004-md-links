//---Metodos de Node---//
const fs = require('fs'); // file system
const path = require('path'); 

//---Verifica si la ruta existe---//
const validatePath = (isPath) => fs.existsSync(isPath);

//---Convierte la ruta de relativa a absoluta---//
const convertPathToAbsolut = (isPath) => {
    if (path.isAbsolute(isPath)){
        return isPath;
    }else {
        return path.resolve(isPath).normalize();
    }
};

//---Obtener Array de rutas .md---//
const getMdFiles = (allMdFiles, isPath) => {
    const isDirRes = fs.statSync(isPath).isDirectory(); //Verifica si la ruta es directorio (true or False)
    if (isDirRes) { //Si es Directorio
        const allDirFiles = fs.readdirSync(isPath); //Array con el contenido del directorio
            // allDirFiles.forEach((oneFile) => {
            //     const absolutPath = path.join(isPath, oneFile);
            //     getMdFiles(allMdFiles, absolutPath)
            // })
        let absolutPath = allDirFiles.map((fileName) => path.join(isPath, fileName)); //Array de Rutas Modificadas
            absolutPath.forEach((fileNamePath) => { 
            getMdFiles(allMdFiles, fileNamePath)
        });
    }else {
        const isMdFiles = path.extname(isPath); //Extencion del archivo
            if(isMdFiles === '.md'){ //Si es archivo .md
                allMdFiles.push(isPath);
        }
    }
    console.log('QUE RETORNA getMdFiles: ', allMdFiles);  
    return allMdFiles;  //Retorna array de Path .md
};

// //-----Leer contenido de un archivo------//
// const readFileContent = (pathToRead) => {
//     fs.readFile(pathToRead, 'utf8', function(err, data){
//         if (err) throw err;
//         console.log(data);
//     });
//}

module.exports = {
    convertPathToAbsolut,
    validatePath,
    getMdFiles,
}