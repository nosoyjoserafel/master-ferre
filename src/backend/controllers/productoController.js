const fs = require('fs');
const path = require('path');
const Producto = require('../services/Producto');

function leerArchivoComoPromesa(rutaArchivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(rutaArchivo, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function resgistrarProducto(req, res) {
    if (!req.body.id || !req.body.nombre || !req.body.categoria || !req.body.precio) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    const producto = `${JSON.stringify(req.body)}\n`

    fs.readFile(path.join(__dirname, '..','data','productos.txt'), 'utf8', (err, data) => {
        if (err) throw err;

        const lines = data.split('\n');
        lines.shift(); // elimina la primera línea (cabecera)
        for (let line of lines) {
            let [id] = line.split(',').map(item => item.trim());
            if (id === req.body.id)
                return res.status(400).send('Error, el ID ingresado ya ha sido registrado para otro producto.\nIntentelo de nuevo');           
        }
        fs.appendFile(path.join(__dirname, '..','data','productos.txt'), producto, (err) => {
            if (err) throw err;
        });
    
        res.send('Producto registrado con éxito!');
    });
}


async function buscarProducto(idBuscado){
    let producto = null;
    try {
        const data = await leerArchivoComoPromesa(path.join(__dirname, '..', 'data', 'productos.txt'));
        let lineas = data.split('\n');

        lineas.forEach(linea => {
            if (linea !== ""){
                let p = JSON.parse(linea);
                if (p.id === idBuscado) {
                    producto = new Producto(p.id, p.nombre, p.categoria, p.precio);
                }
            }
        });
    } catch (err) {
        console.error("Error al leer el archivo: ", err);
    }    
    return producto;
}

function mostrarProducto(req, res){
    fs.readFile(path.join(__dirname, '..','data','productos.txt'), 'utf8', async (err, data) => {
        if (err) throw err;

        let lineas = data.split('\n'); // divide el contenido por líneas

        let productos = lineas.map(linea => {
            if (linea === "")
                return;
            let p = JSON.parse(linea);
            return new Producto(p.id, p.nombre, p.categoria, p.precio);
        })

        res.json(productos);
    })
}

async function eliminarProducto(idBuscado) {
    let producto = await buscarProducto(idBuscado);
    if (producto !== null) {	
        fs.readFile(path.join(__dirname, '..', 'data', 'productos.txt'), 'utf8', (err, data) => {
            if (err) throw err;
            let lineas = data.split('\n');
            let nuevaData = lineas.filter(linea => {
                if(linea !== ""){
                    let p = JSON.parse(linea);
                    return p.id !== idBuscado;
                }
            }).join('\n');
            fs.writeFile(path.join(__dirname, '..', 'data', 'productos.txt'), nuevaData, (err) => {
                if (err) throw err;
            });
        });
        return true
    }
    else {
        return false
    }
}

module.exports = {
    resgistrarProducto,
    buscarProducto,
    mostrarProducto,
    eliminarProducto
};