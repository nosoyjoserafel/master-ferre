import Persona from "./Persona";

class Cliente extends Persona{
    constructor(nombre, apellido, cedula, direccion, telefono, email, password) {
        super(nombre, apellido, cedula, direccion, telefono)
        this.email = email
        this.password = password
    }

    toString(){
        return `Cliente
Nombre: ${this.nombre}
Apellido: ${this.apellido}
Cedula: ${this.cedula}
Direccion: ${this.direccion}
Telefono: ${this.telefono}
Email: ${this.email}
Password: ${this.password}`
    }
}