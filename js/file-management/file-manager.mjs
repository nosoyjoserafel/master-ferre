import {readFile} from 'fs/promises'

async function leerArchivo(filePath){        
    const text = await readFile(filePath,'utf-8');
    return text.toString()
}

export {leerArchivo};

/*
Para obtener el contenido del archivo usar:

leerArch('..\\..\\files\\codigos.txt')
    .then(content => console.log(content))
    .catch(err => console.error(err));
*/