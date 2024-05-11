export class Producto {
    constructor(nombre, precio, marca, categoria,cantidadEnStock, codigo) {
        this.nombre = nombre
        this.precio = precio
        this.marca = marca
        this.categoria = categoria
        this.cantidadEnStock = cantidadEnStock
        this.codigo = codigo	
    }

    agregarStock(cantidad) {
        this.cantidadEnStock += cantidad
    }

    toString(){
        return `Producto
Nombre: ${this.nombre}
Precio: ${this.precio}$
Marca: ${this.marca}
Categoria: ${this.categoria}
Stock: ${this.cantidadEnStock}
Codigo: ${this.codigo}`
    }
}