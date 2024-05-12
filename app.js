const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/registrar', (req, res) => {
    if (!req.body.id || !req.body.nombre || !req.body.categoria || !req.body.precio) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    const producto = `${req.body.id}, ${req.body.nombre}, ${req.body.categoria}, ${req.body.precio}\n`;

    fs.appendFile(path.join(__dirname, 'files', 'productos.txt'), producto, (err) => {
        if (err) throw err;
        console.log('Producto guardado!');
    });

    res.send('Producto registrado con éxito!');
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto https://localhost:3000');
});