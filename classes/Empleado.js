import Persona from "./Persona";

class Empleado extends Persona{
    constructor(nombre, apellido, cedula, direccion, telefono, salario, cargo) {
        super(nombre, apellido, cedula, direccion, telefono)
        this.salario = salario
        this.cargo = cargo
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