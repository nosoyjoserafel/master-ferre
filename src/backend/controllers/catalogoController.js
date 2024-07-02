const fs = require('node:fs');
const path = require('node:path');
const Producto = require('../services/Producto');

function resgistrarProductoCatalogo(req, res){
    if (!req.body.id) {
        return res.status(400).send('El campo ID es requerido');
    }

    fs.readFile(path.join(__dirname, '..','data','productos.txt'), 'utf8', (err, data) => {
        if (err) throw err;

        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)
        let foundFlag = false

        lineas.forEach(linea => {
            let [id, nombre, categoria, precio] = linea.split(",").map(item => item.trim())
            if (id === req.body.id) {
                let producto = new Producto(id, nombre, categoria, precio)
                fs.appendFile(path.join(__dirname, '..','data','catalogo.txt'), producto.toString(), (err) => {
                    if (err) throw err;
                });
                foundFlag = true
                return res.status(200).send('Producto encontrado') //prueba de estado de respuesta
            }
        })
        if (!foundFlag) {
            console.log('Producto no encontrado');
            return res.status(404).send('Producto no encontrado') //prueba de estado de respuesta
        }
    })

}

function mostrarProductoCatalogo(req, res){
    fs.readFile(path.join(__dirname, '..','data','catalogo.txt'), 'utf8', (err, data) => {
        if (err) throw err

        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)

        let productos = lineas.map(linea => {
            let [id, nombre, categoria, precio] = linea.split(",").map(item => item.trim())
            return new Producto(id, nombre, categoria, precio)
        })

        res.json(productos);
    });
}

function modificarProductoCatalogo(req, res){
    if (!req.body.id) {
        return res.status(400).send('El campo ID es requerido');
    }    

    let lineas = data.split('\n'); // divide el contenido por líneas
    lineas.shift(); // elimina la primera línea (cabecera)
    let foundFlag = false

    lineas.forEach(linea => {
    let [id, nombre, categoria, precio] = linea.split(",").map(item => item.trim())
        if (id === req.body.id) {
            let producto = new Producto(id, nombre, categoria, precio)
            fs.appendFile(path.join(__dirname, '..','data','catalogo.txt'), producto.toString(), (err) => {
                if (err) throw err;
            });
            foundFlag = true
            return res.status(200).send('Producto encontrado') //prueba de estado de respuesta
        }
    })
    if (!foundFlag) {
        console.log('Producto no encontrado');
        return res.status(404).send('Producto no encontrado') //prueba de estado de respuesta
    }
}

function leerArchivoComoPromesa(rutaArchivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(rutaArchivo, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function eliminarProductoCatalogo(idProducto) {    
    try {
        const filePath = path.join(__dirname, '..', 'data', 'catalogo.txt');
        const data = await leerArchivoComoPromesa(filePath);
        const lineas = data.split('\n');        
        let nuevaData = lineas.filter(linea => {
            let [id] = linea.split(",").map(item => item.trim());
            return id !== idProducto;
        }).join('\n');
        fs.writeFile(path.join(__dirname, '..', 'data', 'catalogo.txt'), nuevaData, (err) => {
            if (err) throw err;
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    resgistrarProductoCatalogo,
    mostrarProductoCatalogo,
    eliminarProductoCatalogo
};