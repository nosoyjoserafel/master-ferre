const express = require('express');
const app = express();
const path = require('node:path');
const fs = require('node:fs');
const Producto = require('./classes/Producto');
const Cliente = require('./classes/Cliente');
const Empleado = require('./classes/Empleado');
const Catalogo = require('./classes/Catalogo');
const e = require('express');
const mimeTypes = require('mime-types');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
        cb(null, `${file.originalname}.${mimeTypes.extension(file.mimetype)}`)
    }
  });
  
const upload = multer({storage: storage});

app.use(multer({ dest: 'uploads/' }).single('imagen'));
app.use(express.static('public'));
app.use(express.static('files'));
app.use(express.static('pages'));
app.use(express.static('classes'));
app.use(express.static('scripts'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Respuestas del servidor cuando se entra por primera vez
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/main.html'));
});

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

//Respuesta del servidor ante solicitud de ir a pagina de carrito
app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/carrito.html'));
});


//Respuestas del servidor al ejecutar acciones de tipo CRUD en distintas paginas

//para registrar productos en la pagina registrar productos (entregable producto)
app.post('/registrar-producto', upload.single("imagen"),(req, res) => {
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

        lineas.forEach(linea => {
            let [id, nombre, categoria, precio] = linea.split(",").map(item => item.trim())
            if (id === req.body.id) {
                let producto = new Producto(id, nombre, categoria, precio)
                console.log(producto)   //Imprime el producto solicitado por consola
                //(solo para pruebas)
                foundFlag = true
                return res.status(200).send('Producto encontrado') //prueba de estado de respuesta
            }
        })
        if (!foundFlag) {
            console.log('Producto no encontrado');
            return res.status(404).send('Producto no encontrado') //prueba de estado de respuesta
        }
    })

})


app.get('/productos', (req, res) => {
    fs.readFile(path.join(__dirname, 'files', 'productos.txt'), 'utf8', (err, data) => {
        if (err) throw err;

        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)

        let productos = lineas.map(linea => {
            let [id, nombre, categoria, precio] = linea.split(",").map(item => item.trim())
            return new Producto(id, nombre, categoria, precio)
        })

        res.json(productos);
    })
})


app.get('/catalogo', (req, res) => {
    fs.readFile(path.join(__dirname, 'files', 'catalogo.txt'), 'utf8', (err, data) => {
        if (err) throw err

        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)

        let productos = lineas.map(linea => {
            let [id, nombre, categoria, precio] = linea.split(",").map(item => item.trim())
            return new Producto(id, nombre, categoria, precio)
        })

        res.json(productos);
    });
});

//para registrar usuarios en la pagina registrar usuario (entregable usuario)
app.post('/registrar-usuario', (req, res) => {
    if (!req.body.usuario || !req.body.contrasenia || !req.body.cedula || !req.body.telefono || !req.body.direccion) {
        return res.status(400).send('Todos los campos son requeridos, intente de nuevo');
    }

    const pageBody = req.body;
    const newUser = new Cliente(pageBody.nombre,pageBody.apellido,pageBody.usuario,pageBody.contrasenia, pageBody.cedula, pageBody.direccion, pageBody.telefono, pageBody.email);

    fs.readFile(path.join(__dirname, 'files','usuarios.txt'), 'utf8', (err, data) => {
        if (err) throw err;

        const lines = data.split('\n');
        lines.shift(); // elimina la primera línea (cabecera)
        for (let line of lines) {
            let [nombre, apellido, usuario, contraseña, cedula, telefono, direccion, email] = line.split(',').map(item => item.trim());
            if (email === newUser.email)
                return res.status(400).send('Error, el correo ingresado ya ha sido registrado.\nIntentelo de nuevo');
            else if (usuario === newUser.usuario)
                return res.status(400).send('Error, el usuario ingresado ya existe.\nIntentelo de nuevo');
            else if (cedula === newUser.cedula)
                return res.status(400).send('Error, la cedula ingresada ya existe.\nIntentelo de nuevo');
            else if (telefono === newUser.telefono)
                return res.status(400).send('Error, el telefono ingresado ya ha sido registrado.\nIntentelo de nuevo');
        }

        // Si llegamos aquí, el usuario no existe, así que agregamos el nuevo usuario
        fs.appendFile(path.join(__dirname, 'files','usuarios.txt'), newUser.toString(), (err) => {
            if (err) throw err;
            res.status(200).send('Usuario registrado con éxito');
        });
    });
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

        lineas.forEach(linea => {
            let [usuario, contrasenia, cedula, telefono, direccion] = linea.split(",").map(item => item.trim())
            if (cedula === req.body.cedula) {
                let user = new Producto(usuario, contrasenia, cedula, telefono, direccion)
                console.log(user)   //Imprime el usuario solicitado por consola
                //(solo para pruebas, no debe imprimir la contraseña)
                foundFlag = true
                return res.status(200).send('Usuario encontrado') //prueba de estado de respuesta
            }
        })
        if (!foundFlag) {
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

        lineas.forEach(linea => {
            let [id, nombre, categoria, precio] = linea.split(",").map(item => item.trim())
            if (id === req.body.id) {
                let producto = new Producto(id, nombre, categoria, precio)
                fs.appendFile(path.join(__dirname, 'files', 'catalogo.txt'), producto.toString(), (err) => {
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

})

//Ingresar producto al carrito
app.post('/AddToCart', (req, res) => {
    const { usuario, idProducto, cantidad } = req.body;
    fs.readFile(path.join(__dirname, 'files', 'carrito.txt'), (err, data) => {
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
            fs.writeFile(path.join(__dirname, 'files', 'carrito.txt'), carritosString, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            res.send('Producto agregado al carrito');
        }
    })
})

//Ver carrito
app.post('/getCart', (req, res) => {
    const { usuarioSolicitud } = req.body;
    fs.readFile(path.join(__dirname, 'files', 'carrito.txt'), (err, data) => {
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
})

//Modificar Carrito recibo en el body un usuarioSolicitud
app.put('/modifyCart', (req, res) => {
    const { usuarioSolicitud } = req.body;
    fs.readFile(path.join(__dirname, 'files', 'carrito.txt'), (err, data) => {
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
            fs.writeFile(path.join(__dirname, 'files', 'carrito.txt'), carritosString, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            res.send('Carrito modificado');
        }
    })
})

//Eliminar producto del carrito
app.delete('/deleteFromCart', (req, res) => {
    const { usuarioSolicitud, idProducto } = req.body;
    fs.readFile(path.join(__dirname, 'files', 'carrito.txt'), (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            const carritos = JSON.parse(data);
            const carrito = carritos.filter((carrito) => carrito.usuario === usuarioSolicitud)[0];
            carrito.productos = carrito.productos.filter((producto) => producto.idProducto !== idProducto);
            const carritosString = JSON.stringify(carritos);
            fs.writeFile(path.join(__dirname, 'files', 'carrito.txt'), carritosString, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            res.send('Producto eliminado del carrito');
        }
    })
})

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});