const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const Producto = require('./classes/Producto');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Respuesta del servidor al entrar directamente a la pagina principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/registrar-productos.html'));
});

//Respuestas del servidor ante peticiones para ir de una pagina a otra
app.get('/buscar-productos', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/buscar-productos.html'));
});

//para registrar productos en la pagina
app.post('/registrar', (req, res) => {
    if (!req.body.id || !req.body.nombre || !req.body.categoria || !req.body.precio) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    const producto = `${req.body.id}, ${req.body.nombre}, ${req.body.categoria}, ${req.body.precio}\n`;

    fs.appendFile(path.join(__dirname, 'files', 'productos.txt'), producto, (err) => {
        if (err) throw err;
    });

    res.send('Producto registrado con éxito!');
});

//para buscar productos en la pagina
app.post('/buscar', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send('El campo ID es requerido');
    }

    fs.readFile(path.join(__dirname, 'files', 'productos.txt'), 'utf8', (err, data) => {
        if (err) throw err;

        let lineas = data.split('\n'); // divide el contenido por líneas
        lineas.shift(); // elimina la primera línea (cabecera)
        let foundFlag = false

        lineas.forEach(linea=>{
            let [id, nombre, categoria, precio] = linea.split(",")
            if (id === req.body.id){
                let producto = new Producto(id, nombre, categoria, precio)
                console.log(producto)   //Imprime el producto solicitado por consola
                                        //(solo para pruebas)
                foundFlag = true
                res.status(200).send('Producto encontrado') //prueba de estado de respuesta
            }
        })
        if(!foundFlag){
            console.log('Producto no encontrado');
            res.status(404).send('Producto no encontrado')
        }
    })

})

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto https://localhost:3000');
});