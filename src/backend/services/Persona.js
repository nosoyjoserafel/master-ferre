module.exports = class Persona {
    constructor(nombre, apellido, usuario, contrasenia, cedula, direccion, telefono, condicion) {
        this._nombre = nombre
        this._apellido = apellido
        this._usuario = usuario
        this._contrasenia = contrasenia
        this._cedula = cedula
        this._direccion = direccion
        this._telefono = telefono
        this._condicion = condicion      
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get apellido() {
        return this._apellido;
    }

    set apellido(value) {
        this._apellido = value;
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(value) {
        this._usuario = value;
    }

    get contrasenia() {
        return this._contrasenia;
    }

    set contrasenia(value) {
        this._contrasenia = value;
    }

    get cedula() {
        return this._cedula;
    }

    set cedula(value) {
        this._cedula = value;
    }

    get direccion() {
        return this._direccion;
    }

    set direccion(value) {
        this._direccion = value;
    }

    get telefono() {
        return this._telefono;
    }

    set telefono(value) {
        this._telefono = value;
    }

    get condicion() {
        return this._condicion;
    }

    set condicion(value) {
        this._condicion = value;
    }

}