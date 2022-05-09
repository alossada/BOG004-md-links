//-----Importamos Modulos de Node----//
const{
    convertPathToAbsolut,
    validatePath,
    getMdFiles,
    readFileContent,
    httpPetition,
} = require('./node-methods.js')

//-----Funcion Mdlinks-----//
const mdLinks = (path, option) => new Promise ((resolve, reject) => {
    //----Convertir la ruta a absoluta---//
    const pathArgAbsolut = convertPathToAbsolut(path);
    
    //----Validar si la ruta existe---//
    const validatePathRes  = validatePath(pathArgAbsolut);
    
    //--- declarar array vacio para guardar archivo .md desde getMdFiles---//
    let arrayMdFile = [];
    
    //---condicional, si la ruta es valida obtiene  archivos .md---//
    if (validatePathRes === false) {
        resolve('| ✿ INVALID PATH ✿ |');
    } else if (validatePathRes){
        const filesMd = getMdFiles(arrayMdFile, pathArgAbsolut);
        if (filesMd.length === 0){
            resolve('| ✿ EMPTY DIRECTORY ✿ |')
        }else{
            readFileContent(arrayMdFile)
            .then((objectLinks) =>{
                if(objectLinks.length === 0){
                console.log('|   ✿ EMPTY FILE ✿   |');
                }else{
                    if(option.validate === true){
                    httpPetition(objectLinks).then(response => {
                        resolve(response)
                    })
                    } else {
                    resolve(objectLinks);
                    }
                }
            })        
        }
    }
});


module.exports = mdLinks;