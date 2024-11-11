//consumo de la API
const urlHabitaciones = 'http://localhost/proyecto/TrabajoUniversidad/backend/Api-rest-services/infoHabitation.php'
const urlServices = 'http://localhost/proyecto/TrabajoUniversidad/backend/Api-rest-services/serviceshotel.php'
const urlcreateclient ='http://localhost/proyecto/TrabajoUniversidad/backend/Api-rest-client/create_client.php'
//obtener datos de Habitaciones
// Función que obtiene los datos de las habitaciones
async function obtenerDatosHabitaciones() {
    try {
        const response = await fetch(urlHabitaciones);
        if (response.ok) {
            const data = await response.json();  // Procesa la respuesta como JSON
            mostrarHabitaciones(data);  // Llama a la función que maneja los datos cuando están listos
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}
//obtener datos de serviciosHotel
async function obtenerDatosServicios() {

    const dataservices = await fetch(urlServices)
    .then(dataservices => {
        if (dataservices.ok) {
            return dataservices.json();  // Procesa la respuesta como JSON
        }
        throw new Error('Error en la respuesta del servidor');
    })
    .then(res => {
        mostrarServicios(res);
        console.log(res);  // Aquí ves los datos correctamente procesados
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
    });
}


const imagenes = document.querySelector('img');


//funcion carousel

let slideIndex = 1;
    showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

//cargar habitaciones en con javascript
function mostrarHabitaciones(data) {
    const container = document.querySelector('.habitaciones');  // Donde se mostrarán las tarjetas
    container.innerHTML = '';  // Limpiamos el contenedor antes de agregar los nuevos productos

    data.forEach(habitacion => {
        const card = document.createElement('div');
        card.classList.add('card-product');
        // Convertir el tipo de habitación a minúsculas
        const tipoHabitacion = habitacion.tipo_habitación
        // Construir la ruta de la imagen dinámica en minúsculas
        const imagenSrc = `../backend/includes/img/Habitaciones/${tipoHabitacion}.jpg`;

        const precioConDescuento = parseFloat(habitacion.precio_noche);

        const descuento = 22;
// Calculamos el precio original
const precioOriginal = (precioConDescuento / (1 - (descuento / 100))).toFixed(2);

// Formateamos los precios para usar puntos como separadores de miles
const precioFormateado = precioConDescuento.toLocaleString('es-CO').replace(/,/g, '.');
const precioOriginalFormateado = parseFloat(precioOriginal).toLocaleString('es-CO').replace(/,/g, '.');

        
        // Creamos la estructura HTML de la tarjeta
        card.innerHTML = `
            <div class="container-img">
                <img src="${imagenSrc ? imagenSrc : 'ruta/por/defecto.jpg'}" alt="${habitacion.tipo_habitación}" />
                <span class="discount">-${descuento}%</span>
                <div class="button-group">
                    <span><i class="fa-regular fa-eye"></i></span>
                    <span><i class="fa-regular fa-heart"></i></span>
                    <span><i class="fa-solid fa-code-compare"></i></span>
                </div>
            </div>
            <div class="content-card-product">
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <h3>${habitacion.tipo_habitación}</h3>
                <p class="description">
                    ${habitacion.descripción.length > 40 ? habitacion.descripción.substring(0, 30) + '...' : habitacion.descripción}
                </p>
                <p class="price">$${precioFormateado}
                <span>$${precioOriginalFormateado}</span></p>
            </div>
        `;
        
        // Añadimos la tarjeta al contenedor
        container.appendChild(card);
    });
}
function mostrarServicios(res) {
    const container = document.querySelector('.Servicios');  // Donde se mostrarán las tarjetas
    container.innerHTML = '';  // Limpiamos el contenedor antes de agregar los nuevos productos

    res.forEach(servicio => {
        const card = document.createElement('div');
        card.classList.add('card-product');
        // Convertir el tipo de habitación a minúsculas
        const tiposervicio = servicio.servicio_id
        // Construir la ruta de la imagen dinámica en minúsculas
        const imagenserSrc = `../backend/includes/img/Servicios/${tiposervicio}.jpg`;

        const precioConDescuentoser = parseFloat(servicio.precio);

        const descuento = 25;
// Calculamos el precio original
const precioOriginalser = (precioConDescuentoser / (1 - (descuento / 100))).toFixed(2);

// Formateamos los precios para usar puntos como separadores de miles
const precioFormateado = precioConDescuentoser.toLocaleString('es-CO').replace(/,/g, '.');
const precioOriginalFormateado = parseFloat(precioOriginalser).toLocaleString('es-CO').replace(/,/g, '.');

        
        // Creamos la estructura HTML de la tarjeta
        card.innerHTML = `
            <div class="container-img">
                <img src="${imagenserSrc ? imagenserSrc : 'ruta/por/defecto.jpg'}" alt="${servicio.nombre_servicio}" />
                <span class="discount">-${descuento}%</span>
                <div class="button-group">
                    <span><i class="fa-regular fa-eye"></i></span>
                    <span><i class="fa-regular fa-heart"></i></span>
                    <span><i class="fa-solid fa-code-compare"></i></span>
                </div>
            </div>
            <div class="content-card-product">
                <h3>${servicio.nombre_servicio}</h3>
                <p class="description">
                    ${servicio.descripción.length > 40 ? servicio.descripción.substring(0, 30) + '...' : servicio.descripción}
                </p>
                <p class="price">$${precioFormateado}
                <span>$${precioOriginalFormateado}</span></p>
            </div>
        `;
        
        // Añadimos la tarjeta al contenedor
        container.appendChild(card);
    });
}





window.onload = function() {
    obtenerDatosServicios();
    obtenerDatosHabitaciones();
};
