module.exports = class Producto {
    constructor(id, nombre, categoria,precio) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
    }

    toString(){
        return `Producto
ID: ${this.id}
Nombre: ${this.nombre}
Categoria: ${this.categoria}
Precio: ${this.precio}$`
    }
}