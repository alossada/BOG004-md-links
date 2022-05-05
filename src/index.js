//-----Importamos Modulos de Node----//
const{
    convertPathToAbsolut,
    validatePath,
    getMdFiles,
    readFileContent,
    httpPetition,
} = require('./node-methods.js')

//-----Funcion Mdlinks-----//
const mdLinks = (args) => new Promise (() => {
    
    //---Capturar ruta desde los argumentos---//
    const pathArgument = args[2];
    console.log('|    ✿ PATH ARGUMENT ✿    | --->', pathArgument);
    
    //-----Convierte la ruta capturada en Absoluta-----//
    const pathArgAbsolut = convertPathToAbsolut(pathArgument);
    console.log('|    ✿ RUTA ABSOLUTA ✿    | --->', pathArgAbsolut);

    //----Validar si la ruta existe---//
    const validatePathRes  = validatePath(pathArgAbsolut);
    console.log(('|    ✿ RUTA VALIDA ✿   |'), validatePathRes);

    // //---Invoca funcion para obtener archivos recursivamente de la ruta capturada---//
    // const mdFiles = getMdFiles([], pathArgument);
    // console.log('|   ✿ ARRAYS DE ARCHIVOS .md ✿   | ---> ', mdFiles);

    let arrayMdFile = [];
    if (validatePathRes=== false) {
        console.log('| ✿ NO EXISTEN ARCHIVOS ✿ |');
    } else if (validatePathRes){
        const filesMd = getMdFiles(arrayMdFile, pathArgAbsolut);
        console.log('|    ✿ ARCHIVOS .md ✿   |', filesMd);
        if(filesMd.length === 0){
            console.log('| ✿ DIRECTORIO VACÍO ✿  |');
        } else {
            console.log('|    ✿ ARCHIVOS ENCONTRADOS ✿   |', filesMd);
        }
    }else{
        const invalidPath = '|     ✿ LA RUTA INGRESADA NO ES VÁLIDA  ✿   |';
        console.log(invalidPath);
    };

    const linksPromise = readFileContent(arrayMdFile)
        .then((objectLinks) =>{
            if(objectLinks.length === 0){
                // console.log('No se han encontrado links dentro del archivo md... ✿ ✧ | |');
            }else{
                // console.log('Lectura de los archivos:... ✿ ✧ | |');
                // console.log('Links obtenidos:... ✿ ✧ | |');
                return(objectLinks);
            }
        })        
        .catch((error) => {
            const errorMessage = 'Error';
            reject(error, errorMessage) 
        });

    linksPromise.then(links => {
        httpPetition(links).then(response => {
            console.log('SE SUPONE QUE SON LINKS', response);
        })
    })
})


module.exports = mdLinks;