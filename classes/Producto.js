module.exports = class Producto {
    constructor(id, nombre, categoria,precio) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
    }

    toString(){
        return `${this.id}, ${this.nombre}, ${this.categoria}, ${this.precio}\n`
    }
}