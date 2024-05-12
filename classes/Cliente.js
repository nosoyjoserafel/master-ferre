import Persona from "./Persona";

class Cliente extends Persona{ //aun bajo pruebas
    constructor(nombre, apellido, usuario, cedula, direccion, telefono, email) {
        super(nombre, apellido, usuario, cedula, direccion, telefono)
        this.email = email
    }

    toString(){
        return `Cliente
Nombre: ${this.nombre}
Apellido: ${this.apellido}
Cedula: ${this.cedula}
Direccion: ${this.direccion}
Telefono: ${this.telefono}
Email: ${this.email}`
    }
}