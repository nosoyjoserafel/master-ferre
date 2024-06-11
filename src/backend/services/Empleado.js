const Persona = require('./Persona.js')

module.exports = class Empleado extends Persona{ //aun bajo pruebas
    constructor(nombre, apellido, usuario, cedula, direccion, telefono, salario, cargo) {
        super(nombre, apellido, usuario, cedula, direccion, telefono, "emlpeado")
        this._salario = salario
        this._cargo = cargo
    }

    get salario() {
        return this._salario;
    }
    
    set salario(value) {
        this._salario = value;
    }
    
    get cargo() {
        return this._cargo;
    }
    
    set cargo(value) {
        this._cargo = value;
    }

    toString(){
        return `Empleado
Nombre: ${this.nombre}
Apellido: ${this.apellido}
Cedula: ${this.cedula}
Direccion: ${this.direccion}
Telefono: ${this.telefono}
Salario: ${this.salario}
Cargo: ${this.cargo}`
    }
}