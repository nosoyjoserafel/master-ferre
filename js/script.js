import Producto from "./classes/Producto.js"

//variables globales
let productos = []

// Obtén todos los campos de entrada y el botón
let inputs = document.querySelectorAll('input');
let button = document.getElementById('registrar');

let escalaTamanios = ['mm','cm','m']
let select = document.getElementById('escala-tamaños');

escalaTamanios.forEach(peso => {
  let option = document.createElement('option');
  option.value = peso;
  option.textContent = peso;
  select.appendChild(option);
});


// Agrega un controlador de eventos al botón
button.addEventListener('click', function() {
    // Verifica cada campo de entrada
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === ''){
            alert('Todos los campos deben ser llenados');
            return;
        }
    }

    let p = new Producto(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, select.value, inputs[4].value, inputs[5].value, inputs[6].value);
    productos.push(p)
    alert("Producto registrado con exito")
});