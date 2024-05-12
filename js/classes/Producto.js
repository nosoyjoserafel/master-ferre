export default class Producto {
    constructor(id, nombre, categoria,tamanio, escalaTamanio,marca, descripcion, precio) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.tamanio = tamanio
        this.escalaTamanio = escalaTamanio
        this.marca = marca
        this.descripcion = descripcion
        this.precio = precio
    }

    toString(){
        return `Producto
ID: ${this.id}
Nombre: ${this.nombre}
Categoria: ${this.categoria}
Tamaño: ${this.tamanio}${this.escalaTamanio}
Marca: ${this.marca}
Descripcion: ${this.descripcion}
Precio: ${this.precio}`
    }
}