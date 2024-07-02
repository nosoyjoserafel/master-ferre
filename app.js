const express = require('express');
const app = express();
const path = require('node:path');
const fs = require('node:fs');
const Producto = require('./src/backend/services/Producto');
const Cliente = require('./src/backend/services/Cliente');
const Empleado = require('./src/backend/services/Empleado');
const Catalogo = require('./src/backend/services/Catalogo');
const e = require('express');
const upload = require('./src/backend/libs/upload');
const productoController = require('./src/backend/controllers/productoController');
const catalogoController = require('./src/backend/controllers/catalogoController');
const usuarioController = require('./src/backend/controllers/usuarioController');
const carritoController = require('./src/backend/controllers/carritoController');
app.use(express.static('public'));
app.use(express.static('files'));
app.use(express.static('pages'));
app.use(express.static('classes'));
app.use(express.static('scripts'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Respuestas del servidor cuando se entra por primera vez
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/frontend/pages/main.html'));
});

//Respuesta del servidor al entrar a una pagina y querer volver al main
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/frontend/pages/main.html'));
});

app.purge('/main/delete', async (req,res) => {
    await catalogoController.eliminarProductoCatalogo(req.body.id);
});

//Respuesta del servidor ante solicitud de ir a pagina registrar producto
app.get('/registrar-productos', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/frontend/pages/registrar-producto.html'));
});


//Respuesta del servidor ante solicitud de ir a pagina buscar producto
app.get('/buscar-producto', async (req, res) => {
    const id = req.query.id;
    if (id) {    
        try {            
            let producto = await productoController.buscarProducto(id); //falta vlidar que no encuentre el producto
            res.json(producto);
        } catch (error) {
            console.error("Error al buscar producto:", error);
            res.status(500).send("Error interno del servidor");
        }
    } else {
        res.sendFile(path.join(__dirname + '/src/frontend/pages/buscar-producto.html'));
    }
});

app.purge('/buscar-producto/delete', async (req,res) => {
    const id = req.query.id;    
    if (id) {
        try {
            let found = await productoController.eliminarProducto(id);
            if(found){
                res.status(200).send("Producto eliminado con exito");
            }
            else{
                res.status(404).send("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
});

app.get('/registrar-usuario', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/frontend/pages/registrar-usuario.html'));
});

app.get('/buscar-usuario', async (req, res) => {    
    const cedula = req.query.cedula;
    if (cedula) {    
        try {
            let usuario = await usuarioController.buscarUsuario(cedula);
            res.json(usuario);
        } catch (error) {
            console.error("Error al buscar usuario:", error);
            res.status(500).send("Error interno del servidor");
        }
    } else {
        res.sendFile(path.join(__dirname + '/src/frontend/pages/buscar-usuario.html'));
    }
});


//Respuesta del servidor ante solicitud de ir a pagina de registrar producto en catalogo
app.get('/registrar-producto-catalogo', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/frontend/pages/registrar-producto-catalogo.html'));
});

//Respuesta del servidor ante solicitud de ir a pagina de carrito
app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/frontend/pages/carrito.html'));
});

//Respuestas del servidor al ejecutar acciones de tipo CRUD en distintas paginas

//para registrar productos en la pagina registrar productos (entregable producto)
app.post('/registrar-producto', upload.single("imagen"),productoController.resgistrarProducto);

//para buscar productos en la pagina buscar productos (entregable producto, se buscan por su id)
app.get('/productos', productoController.mostrarProducto)

//para buscar productos y registrarlos en el catalogo si existen (entregable catalogo, se buscan por su id)
app.post('/registrar-producto-catalogo', catalogoController.resgistrarProductoCatalogo);

//para mostrar productos en catalogo (entregable catalogo)
app.get('/catalogo', catalogoController.mostrarProductoCatalogo);

//para registrar usuarios en la pagina registrar usuario (entregable usuario)
app.post('/registrar-usuario', usuarioController.registrarUsuario);

//Agregar producto al carrito
app.post('/AddToCart', carritoController.agregarProductoCarrito);

//Mostrar carrito
app.post('/getCart', carritoController.mostrarCarrito)

//Modificar Carrito recibo en el body un usuarioSolicitud
app.put('/modifyCart', carritoController.modificarCarrito)

//Eliminar producto del carrito
app.delete('/deleteFromCart', carritoController.eliminarProductoCarrito)

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});