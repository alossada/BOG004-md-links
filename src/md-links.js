//-----Importamos Modulos de Node----//
const{
    convertPathToAbsolut,
    getMdFiles,
} = require('./node-methods.js')

//-----Funcion Mdlinks-----//
const mdLinks = (args) => new Promise (() => {
    
    //---Capturar ruta desde los argumentos---//
    const pathArgument = args[2];
    console.log('PATH ARGUMENT :', pathArgument);
    
    //-----Convierte la ruta capturada en Absoluta-----//
    const pathArgAbsolut = convertPathToAbsolut(pathArgument);
    console.log('ABSOLUT PATH ARGUMENT: ', pathArgAbsolut);

    //---Invoca funcion para obtener archivos recursivamente de la ruta capturada---//
    const mdFiles = getMdFiles([], pathArgument);
    console.log('ARRAYS DE ARCHIVOS .md: ', mdFiles);
});

module.exports = mdLinks;