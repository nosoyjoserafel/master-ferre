const fs = require('fs');
const path = require('node:path');
const Carrito = require('../services/Carrito');

function agregarProductoCarrito(req, res){
    const { usuario, idProducto, cantidad } = req.body;
    fs.readFile(path.join(__dirname, '..','data','carrito.txt'), (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            const carritos = JSON.parse(data);
            const carrito = carritos.filter((carrito) => carrito.usuario === usuario)[0];
            if (carrito) {
                carrito.productos.push({ idProducto, cantidad });
            }
            else {
                carritos.push({ usuario, productos: [{ idProducto, cantidad }] });
            }
            const carritosString = JSON.stringify(carritos);
            fs.writeFile(path.join(__dirname, '..','data','carrito.txt'), carritosString, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            res.send('Producto agregado al carrito');
        }
    })
}

function mostrarCarrito(req, res){
    const { usuarioSolicitud } = req.body;
    fs.readFile(path.join(__dirname, '..','data','carrito.txt'), (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            const carritos = JSON.parse(data);
            const carrito = carritos.filter((carrito) => carrito.usuario === usuarioSolicitud)[0];

            const carritoString = JSON.stringify(carrito);
            res.send(carritoString);
        }
    })
}

function modificarCarrito(req, res){
    const { usuarioSolicitud } = req.body;
    fs.readFile(path.join(__dirname, '..','data','carrito.txt'), (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            const carritos = JSON.parse(data);
            const carrito = carritos.filter((carrito) => carrito.usuario === usuarioSolicitud)[0];
            carrito.productos = carrito.productos.map((producto) => {
                return { idProducto: producto.idProducto, cantidad: producto.cantidad + 1 };
            });
            const carritosString = JSON.stringify(carritos);
            fs.writeFile(path.join(__dirname, '..','data','carrito.txt'), carritosString, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            res.send('Carrito modificado');
        }
    })
}

function eliminarProductoCarrito(req, res){
    const { usuarioSolicitud, idProducto } = req.body;
    fs.readFile(path.join(__dirname, '..','data','carrito.txt'), (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            const carritos = JSON.parse(data);
            const carrito = carritos.filter((carrito) => carrito.usuario === usuarioSolicitud)[0];
            carrito.productos = carrito.productos.filter((producto) => producto.idProducto !== idProducto);
            const carritosString = JSON.stringify(carritos);
            fs.writeFile(path.join(__dirname, '..','data','carrito.txt'), carritosString, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            res.send('Producto eliminado del carrito');
        }
    })
}

module.exports = {
    agregarProductoCarrito,
    mostrarCarrito,
    modificarCarrito,
    eliminarProductoCarrito
}