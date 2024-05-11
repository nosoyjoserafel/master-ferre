import { Producto } from "./classes/Producto.mjs";
import { leerArchivo } from "./file-management/file-manager.mjs"

// Obtén todos los campos de entrada y el botón
let inputs = document.querySelectorAll('input');
let button = document.getElementById('registrar');

let codigos
leerArchivo('..\\..\\files\\codigos.txt')
    .then(content => {
        codigos = content.split('\n');
        console.log(codigos)
    })
    .catch(err => console.error(err));
let select = document.getElementById('codigos');

codigos.forEach(codigo => {
  let option = document.createElement('option');
  option.value = codigo;
  option.textContent = codigo;
  select.appendChild(option);
});

// Agrega un controlador de eventos al botón
button.addEventListener('click', function() {
    // Verifica cada campo de entrada
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            alert('Todos los campos deben ser llenados');
            return;
        }
    }

    let p = new Producto(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
    console.log(p.toString())
});