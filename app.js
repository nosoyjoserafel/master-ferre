const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const Producto = require('./classes/Producto');
const Cliente = require('./classes/Cliente');
const Empleado = require('./classes/Empleado');
const Catalogo = require('./classes/Catalogo');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Respuesta del servidor al entrar directamente a la pagina principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/main.html'));
});

//Respuestas del servidor ante peticiones para ir de una pagina a otra

//Respuesta del servidor al entrar a una pagina y querer volver al main
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/main.html'));
});

//Respuesta del servidor ante solicitud de ir a pagina registrar producto
app.get('/registrar-productos', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/registrar-producto.html'));
});


//Respuesta del servidor ante solicitud de ir a pagina buscar producto
app.get('/buscar-producto', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/buscar-producto.html'));
});

//Respuesta del servidor ante solicitud de ir a pagina de registrar usuario
app.get('/registrar-usuario', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/registrar-usuario.html'));
});

//Respuesta del servidor ante solicitud de ir a pagina de buscar usuario
app.get('/buscar-usuario', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/buscar-usuario.html'));
});

//Respuesta del servidor ante solicitud de ir a pagina de registrar producto en catalogo
app.get('/registrar-producto-catalogo', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/registrar-producto-catalogo.html'));
});

//Respuestas del servidor al ejecutar acciones de tipo CRUD en distintas paginas

//para registrar productos en la pagina registrar productos (entregable producto)
app.post('/registrar-producto', (req, res) => {
    if (!req.body.id || !req.body.nombre || !req.body.categoria || !req.body.precio) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    const producto = `${req.body.id}, ${req.body.nombre}, ${req.body.categoria}, ${req.body.precio}\n`;

    fs.appendFile(path.join(__dirname, 'files', 'productos.txt'), producto, (err) => {
        if (err) throw err;
    });

    res.send('Producto registrado con éxito!');
});

//para buscar productos en la pagina buscar productos (entregable producto, se buscan por su id)
app.post('/buscar-producto', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send('El campo ID es requerido');
    }

    fs.readFile(path.join(__dirname, 'files', 'productos.txt'), 'utf8', (err, data) => {
        if (err) throw err;

        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)
        let foundFlag = false

        lineas.forEach(linea=>{
            let [id, nombre, categoria, precio] = linea.split(",").map(item=> item.trim())
            if (id === req.body.id){
                let producto = new Producto(id, nombre, categoria, precio)
                console.log(producto)   //Imprime el producto solicitado por consola
                                        //(solo para pruebas)
                foundFlag = true
                return res.status(200).send('Producto encontrado') //prueba de estado de respuesta
            }
        })
        if(!foundFlag){
            console.log('Producto no encontrado');
            return res.status(404).send('Producto no encontrado') //prueba de estado de respuesta
        }
    })

})

//para registrar usuarios en la pagina registrar usuario (entregable usuario)
app.post('/registrar-usuario', (req, res) => {    
    if(!req.body.usuario || !req.body.contrasenia || !req.body.cedula || !req.body.telefono || !req.body.direccion) {        
        return res.status(400).send('Todos los campos son requeridos, intente de nuevo');
    }

    const usuario = new Cliente(req.body.nombre,req.body.apellido,req.body.usuario, req.body.contrasenia, req.body.cedula, req.body.direccion, req.body.telefono, req.body.email);

    fs.appendFile(path.join(__dirname, 'files', 'usuarios.txt'), usuario.toString(), (err) => {
        if (err) throw err;
    });

    res.send('Usuario registrado con éxito!');
});


//para buscar usuarios en la pagina buscar usuarios 
//(entregable usuarios, se buscan por su cedula de momento)
app.post('/buscar-usuario', (req, res) => {
    if (!req.body.cedula) {
        return res.status(400).send('El campo cedula es requerido');
    }
    
    fs.readFile(path.join(__dirname, 'files', 'usuarios.txt'), 'utf8', (err, data) => {
        if (err) throw err;
        
        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)
        let foundFlag = false
        
        lineas.forEach(linea=>{            
            let [usuario, contrasenia, cedula, telefono, direccion] = linea.split(",").map(item=> item.trim())            
            if (cedula === req.body.cedula){
                let user = new Producto(usuario, contrasenia, cedula, telefono, direccion)
                console.log(user)   //Imprime el usuario solicitado por consola
                //(solo para pruebas, no debe imprimir la contraseña)
                foundFlag = true
                return res.status(200).send('Usuario encontrado') //prueba de estado de respuesta
            }
        })
        if(!foundFlag){
            console.log('Usuario no encontrado');
            return res.status(404).send('Usuario no encontrado') //prueba de estado de respuesta
        }
    })
    
})

//para buscar productos y registrarlos en el catalogo si existen (entregable catalogo, se buscan por su id)
app.post('/registrar-producto-catalogo', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send('El campo ID es requerido');
    }

    fs.readFile(path.join(__dirname, 'files', 'productos.txt'), 'utf8', (err, data) => {
        if (err) throw err;

        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)
        let foundFlag = false

        lineas.forEach(linea=>{
            let [id, nombre, categoria, precio] = linea.split(",").map(item=> item.trim())
            if (id === req.body.id){
                let producto = new Producto(id, nombre, categoria, precio)
                fs.appendFile(path.join(__dirname, 'files', 'catalogo.txt'), producto.toString(), (err) => {
                    if (err) throw err;
                });
                foundFlag = true
                return res.status(200).send('Producto encontrado') //prueba de estado de respuesta
            }
        })
        if(!foundFlag){
            console.log('Producto no encontrado');
            return res.status(404).send('Producto no encontrado') //prueba de estado de respuesta
        }
    })

})

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});