module.exports = class Persona {
    constructor(nombre, apellido, usuario, contrasenia, cedula, direccion, telefono, condicion) {
        this.nombre = nombre
        this.apellido = apellido
        this.usuario = usuario
        this.contrasenia = contrasenia
        this.cedula = cedula
        this.direccion = direccion
        this.telefono = telefono
        this.condicion = condicion      
    }
}