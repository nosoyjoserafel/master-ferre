export default class Producto {
    constructor(id, nombre, categoria,tamanio, escalaTamanio,marca, precio,descripcion) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.tamanio = tamanio
        this.escalaTamanio = escalaTamanio
        this.marca = marca
        this.precio = precio
        this.descripcion = descripcion
    }

    toString(){
        return `Producto
ID: ${this.id}
Nombre: ${this.nombre}
Categoria: ${this.categoria}
Tamaño: ${this.tamanio}${this.escalaTamanio}
Marca: ${this.marca}
Precio: ${this.precio}$
Descripcion: ${this.descripcion}`
    }
}