const fs = require('fs');
const path = require('path');
const Producto = require('../services/Producto');

function resgistrarProducto(req, res) {
    if (!req.body.id || !req.body.nombre || !req.body.categoria || !req.body.precio || !req.body.imagen) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    const producto = `${req.body.id}, ${req.body.nombre}, ${req.body.categoria}, ${req.body.precio}, ${req.body.imagen}\n`;

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

function leerArchivoComoPromesa(rutaArchivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(rutaArchivo, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function buscarProducto(idBuscado){
    let producto = null;
    try {
        const data = await leerArchivoComoPromesa(path.join(__dirname, '..', 'data', 'productos.txt'));
        let lineas = data.split('\n');
        lineas.shift(); // elimina la primera línea (cabecera)

        lineas.forEach(linea => {
            let [id, nombre, categoria, precio, imagen] = linea.split(",").map(item => item.trim());
            if (id === idBuscado) {
                producto = new Producto(id, nombre, categoria, precio, imagen);
            }
        });
    } catch (err) {
        console.error("Error al leer el archivo: ", err);
    }    
    return producto;
}

function mostrarProducto(req, res){
    fs.readFile(path.join(__dirname, '..','data','productos.txt'), 'utf8', (err, data) => {
        if (err) throw err;

        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)

        let productos = lineas.map(linea => {
            let [id, nombre, categoria, precio, imagen] = linea.split(",").map(item => item.trim())
            return new Producto(id, nombre, categoria, precio, imagen)
        })

        res.json(productos);
    })
}

module.exports = {
    resgistrarProducto,
    buscarProducto,
    mostrarProducto
};