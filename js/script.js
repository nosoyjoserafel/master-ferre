import Producto from "./classes/Producto.js"

// Obtén todos los campos de entrada y el botón
let inputs = document.querySelectorAll('input');
let button = document.getElementById('registrar');

let codigos = ['Seleccione un código','123', '456', '789', '101', '112', '131', '415', '161', '718']
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
        if (inputs[i].value.trim() === ''|| select.value === 'Seleccione un código'){
            alert('Todos los campos deben ser llenados');
            return;
        }
    }

    let p = new Producto(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, select.value);
    alert("Producto registrado con exito")
});