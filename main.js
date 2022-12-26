/* Se trata de un sistema de intercambio de cocheras en casas particulares.
Los usuarios publican su oferta para que otros usuarios los contacten. 
Los dueños completan el formulario con sus datos personales y luego los de la cochera.
Fijan el precio base y luego la página otorga una serie de Bonus que incrementan su valor,
dependiendo de la zona (centro, cerca o lejos) y de diferentes features como si
es techada, si entra una camioneta de gran porte o si esta automatizado el ingreso.
El sistema toma la data por medio de un form y devuelve por DOM la cotización de la cochera.
Luego se muestra por DOM una ficha de la cochera, elaborada con iconografia.
Para el proyecto final se implementara un array con todas las cocheras cargadas y
la posibilidad de contactar al dueño de la cochera por email.

Kreimer Nataniel - Comision 41300
*/

const form = document.querySelector('form');
form.addEventListener('submit', calculatePrice);

function calculatePrice(event) {

    // Evitar que la página se recargue cuando se envía el formulario
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    const user = document.querySelector('#user').value;
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const email = document.querySelector('#email').value;
    const price = document.querySelector('#price').value;
    const address = document.querySelector('#address').value;
    const zone = document.querySelector('#zone').value;
    const remote = document.querySelector('#remote').checked;
    const large = document.querySelector('#large').checked;
    const covered = document.querySelector('#covered').checked;

    // Inicializar el precio final en el precio sin modificar
    let finalPrice = price;

    // Aplicar BONUS x zona y x features según corresponda.
    // Si esta en el centro suma 20%. Si esta Cerca, el 10%.
    // Por cada feature, suma un 10% mas.
    if (zone === 'CENTRO 1') {
      finalPrice = finalPrice * 1.2;
    } else if (zone === 'CERCA 2') {
      finalPrice = finalPrice * 1.1;
    }
    if (remote) {
      finalPrice = finalPrice * 1.1;
    }
    if (large) {
      finalPrice = finalPrice * 1.1;
    }
    if (covered) {
      finalPrice = finalPrice * 1.1;
    }

    // Guardar el precio final en el memoria local
    localStorage.setItem('finalPrice', finalPrice);

    // Mostrar el precio final en el DOM
    document.querySelector('#final-price').textContent = 'Precio final: ' + finalPrice.toFixed(0);
}

// card

// Creo un objeto JSON con los datos del formulario
let datas = {user: user, address: address, zone: zone, price: price,
remote: remote, large: large, covered: covered}

dataString = JSON.stringify(datas);
localStorage.setItem('formData', dataString);

dataString = localStorage.getItem('formData');
datas = JSON.parse(dataString);

const card = `
<div class="card">
    <h2>${datas.user}</h2>
    <p>${datas.email}</p>
    <p>Precio: ${datas.price}</p>
    <ul>
    ${datas.remote ? '<li><i class="fas fa-wifi"></i> Control remoto</li>' : ''}
    ${datas.large ? '<li><i class="fas fa-truck"></i> Tamaño grande</li>' : ''}
    ${datas.covered ? '<li><i class="fas fa-umbrella"></i> Cubierta</li>' : ''}
    ${datas.zone ? `<li><i class="fas fa-map-marker-alt"></i> Zona ${datas.zone}</li>` : ''}
    </ul>
</div>
`;

document.querySelector('#card-container').innerHTML = card;




