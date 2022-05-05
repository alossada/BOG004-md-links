//---Metodos de Node---//
const fs = require('fs'); // file system
const path = require('path'); 
const { default: fetch } = require("node-fetch");




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
            allDirFiles.forEach((file) => {
                const absolutPath = path.join(isPath, file);
                getMdFiles(allMdFiles, absolutPath)
            })
        // let absolutPath = allDirFiles.map((fileName) => path.join(isPath, fileName)); //Array de Rutas Modificadas
        //     absolutPath.forEach((fileNamePath) => { 
        //     getMdFiles(allMdFiles, fileNamePath)
        // });
    }else {
        const isMdFiles = path.extname(isPath); //Extencion del archivo
            if(isMdFiles === '.md'){ //Si es archivo .md
                allMdFiles.push(isPath);
        }
    }
    return allMdFiles;  //Retorna array de Path .md
};

//leer los archivos y extraer los links. Esta funcion me retorna un arreglo de objetos con los links encontados.
const getLinks = (content, arrayMds) => {
    const expReg1 = /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg; // CAPTURAR TODOS LOS '[]()'
    const expReg2 = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg; // CAPTURAR LO QUE HAY DENTRO DE UN ()
    const expReg3 = /\[([\w\s\d]+)\]/g; // CAPTURAR LO QUE HAY DENTRO DE UN []
    
    const fileContent = content;//lee el archivo
    // console.log('fileContent: ', fileContent);
    const links = fileContent.match(expReg1);/* extraigo los links que coincidan con mi expresion regular
    match() se usa para obtener todas las ocurrencias de una expresión regular dentro de una cadena.*/
    // console.log('links: ', links);
    let arrayLinks;

    if (links) {
        arrayLinks = links.map((myLinks) => {
            const myhref = myLinks.match(expReg2).join().slice(1, -1);//URL ()
            const mytext = myLinks.match(expReg3).join().slice(1, -1);//Texto []
            return {
                href: myhref,
                text: mytext,
                fileName: arrayMds,//Ruta del archivo donde se encontró el link.
            };
        });        
    } else if (links === null){
        return [];
    }
        return arrayLinks;    
};

//-----Leer contenido de un archivo------//
const readFileContent = (arrayMds) => new Promise ((resolve) => {
    const mdArray = [];
    arrayMds.forEach((element) => {
        fs.readFile(element, 'utf8', function(err, data){
            if (err){
                const errorMessage = '| ✧ Empty File ✧  |';
                console.log(errorMessage);
            } else {
                mdArray.push(getLinks(data, element));
                if (arrayMds.length === mdArray.length){
                    resolve(mdArray.flat());
                }
            }
        });
    })
});

// FUNCION QUE OBTIENE UN ARREGLO DE PROMESAS QUE RETORNAN OBJETOS
const httpPetition = (arrObjLinks) => {
    const arrPromise = arrObjLinks.map((obj) => fetch(obj.href)
        .then((res) => ({
        href: obj.href,
        text: obj.text,
        file: obj.fileName,
        status: res.status,
        ok: res.ok ? 'OK' : 'FAIL'
        }))
        .catch(() => ({
        href: obj.href,
        text: obj.text,
        file: obj.fileName,
        status: 500,
        ok: 'FAIL'
        })));
    return Promise.all(arrPromise);
};  

module.exports = {
    convertPathToAbsolut,
    validatePath,
    getMdFiles,
    readFileContent,
    httpPetition,
}