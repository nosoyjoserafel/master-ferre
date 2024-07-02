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

function leerArchivoComoPromesa(rutaArchivo) {
    return new Promise((resolve, reject) => {
        fs.readFile(rutaArchivo, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function buscarUsuario(cedulaBuscada) {
    let usuario = null;
    try {
        const data = await leerArchivoComoPromesa(path.join(__dirname, '..', 'data', 'usuarios.txt'));
        let lineas = data.split('\n');
        lineas.shift(); // elimina la primera línea (cabecera)

        lineas.forEach(linea => {
            let [nombre, apellido, nombreUsuario, contrasenia, cedula, telefono, direccion] = linea.split(",").map(item => item.trim());
            if (cedula === cedulaBuscada) {
                usuario = new Cliente(nombre, apellido, nombreUsuario, contrasenia, cedula, telefono, direccion);                
            }
        });
    } catch (err) {
        console.error("Error al leer el archivo: ", err);
    }    
    return usuario;
}

async function buscarUsuario(cedulaBuscada) {
    try {
        fs.readFile(path.join(__dirname, '..', 'data', 'usuarios.txt'), 'utf8', (err, data) => {
            if (err) throw err;
            let lineas = data.split('\n');            
            let nuevaData = lineas.filter(linea => {
                let [nombre, apellido, usuario, contraseña, cedula] = linea.split(",").map(item => item.trim());
                return cedula !== cedulaBuscada;
            }).join('\n');
            fs.writeFile(path.join(__dirname, '..', 'data', 'usuarios.txt'), nuevaData, (err) => {
                if (err) throw err;
            });
        });
    } catch (err) {
        console.error("Error al modificar el archivo: ", err);
    }
}

module.exports = {
    registrarUsuario,
    buscarUsuario
};