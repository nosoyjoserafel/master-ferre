const fs = require('fs');
const path = require('node:path');
const Cliente = require('../services/Cliente');

function registrarUsuario(req, res) {
    if (!req.body.usuario || !req.body.contrasenia || !req.body.cedula || !req.body.telefono || !req.body.direccion) {
        return res.status(400).send('Todos los campos son requeridos, intente de nuevo');
    }

    const pageBody = req.body;
    const newUser = new Cliente(pageBody.nombre,pageBody.apellido,pageBody.usuario,pageBody.contrasenia, pageBody.cedula, pageBody.direccion, pageBody.telefono, pageBody.email);

    fs.readFile(path.join(__dirname, '..','data','usuarios.txt'), 'utf8', (err, data) => {
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
        fs.appendFile(path.join(__dirname, '..','data','usuarios.txt'), newUser.toString(), (err) => {
            if (err) throw err;
            res.status(200).send('Usuario registrado con éxito');
        });
    });
}

function buscarUsuario(req, res){
    if (!req.body.cedula) {
        return res.status(400).send('El campo cedula es requerido');
    }

    fs.readFile(path.join(__dirname, '..','data','usuarios.txt'), 'utf8', (err, data) => {
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
}

module.exports = {
    registrarUsuario,
    buscarUsuario
};