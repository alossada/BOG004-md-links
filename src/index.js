//-----Importamos Modulos de Node----//
const{
    convertPathToAbsolut,
    validatePath,
    getMdFiles,
    readFileContent,
    httpPetition,
} = require('./node-methods.js')

//-----Funcion Mdlinks-----//
const mdLinks = (path, option = {validate: false}) => new Promise ((resolve, reject) => {
    
    //---Capturar ruta desde los argumentos---//
    // const pathArgument = args[2];
    // console.log('|    ✿ PATH ARGUMENT ✿    | --->', pathArgument);
    
    //-----Convierte la ruta capturada en Absoluta-----//
    const pathArgAbsolut = convertPathToAbsolut(path);
    console.log('|    ✿ RUTA ABSOLUTA ✿    | --->', pathArgAbsolut);

    //----Validar si la ruta existe---//
    const validatePathRes  = validatePath(pathArgAbsolut);
    console.log(('|    ✿ RUTA VALIDA ✿   |'), validatePathRes);

    // //---Invoca funcion para obtener archivos recursivamente de la ruta capturada---//
    let arrayMdFile = [];
    if (validatePathRes=== false) {
        console.log('| ✿ LA RUTA NO EXISTE ✿ |');
    } else if (validatePathRes){
        const filesMd = getMdFiles(arrayMdFile, pathArgAbsolut);
        if(filesMd.length === 0){
            console.log('|     ✿ DIRECTORIO NO CONTIENE ARCHIVOS .md ✿     |');
        } else {
            console.log('|    ✿ ARCHIVOS ENCONTRADOS ✿   |', filesMd);
        }
    }else{
        console.log('|     ✿ LA RUTA INGRESADA NO ES VÁLIDA ✿     |');
    };
    
    readFileContent(arrayMdFile)
        .then((objectLinks) =>{
            if(objectLinks.length === 0){
                console.log('|     ✿ El archivo no contiene links ✿     |');
            }else{
                console.log('Que archivos encuentra?',objectLinks);
                if(option.validate === true){
                    httpPetition(objectLinks).then(response => {
                        resolve(response)
                    })
                } else {
                    resolve(objectLinks);
                }
            }
        })        
        .catch((error) => {
            const errorMessage = 'Error';
            reject(error, errorMessage) 
        });
});


module.exports = mdLinks;