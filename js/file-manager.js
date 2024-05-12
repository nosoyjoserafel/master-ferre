var fs = require("fs")

function leerArchivo(ruta) {
    var archivo = fs.readFileSync(ruta, "utf-8")
    return archivo
}

module.exports = leerArchivo
