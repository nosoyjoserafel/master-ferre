const Persona = require('./Persona.js')

module.exports = class Cliente extends Persona{ //aun bajo pruebas
    constructor(nombre, apellido, usuario, contrasenia, cedula, direccion, telefono, email) {
        super(nombre, apellido, usuario, contrasenia, cedula, direccion, telefono, "Cliente")
        this._email = email
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    toString(){
        return `${this._nombre}, ${this._apellido}, ${this._usuario}, ${this._contrasenia}, ${this._cedula}, ${this._telefono}, ${this._direccion}, ${this._email}, ${this._condicion}\n`
    }
}