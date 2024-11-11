//consumo de la API
const urlHabitaciones = 'http://localhost/proyecto/TrabajoUniversidad/backend/Api-rest-services/infoHabitation.php'
const urlServices = 'http://localhost/proyecto/TrabajoUniversidad/backend/Api-rest-services/serviceshotel.php'
const urlcreateclient = 'http://localhost/proyecto/TrabajoUniversidad/backend/Api-rest-client/create_client.php'
const imagenes = document.querySelector('img')
// Elementos del modal y botón de reserva
const modal = document.getElementById('reservation-modal')
const reserveBtn = document.getElementById('reserve-btn')
const closeBtn = document.querySelector('.close-btn')

// Elementos select en el formulario del modal
const nombreServicioSelect = document.getElementById('nombre_servicio')
const tipoHabitacionSelect = document.getElementById('tipo_habitacion')


//obtener datos de Habitaciones
let habitacionesData = []
// Función que obtiene los datos de las habitaciones
async function obtenerDatosHabitaciones() {
    try {
        const response = await fetch(urlHabitaciones);
        if (response.ok) {
            const data = await response.json();  // Procesa la respuesta como JSON
            llenarSelectHabitaciones(data)
            mostrarHabitaciones(data)
            habitacionesData = data;
            if (Array.isArray(data) && data.length > 0) {
                llenarSelectHabitaciones(data); // Llenar select de habitaciones
            } else {
                console.warn("Los datos de habitaciones no son válidos o están vacíos.");
            }
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}
//obtener datos de serviciosHotel
let servicesData = []
async function obtenerDatosServicios() {

    const dataservices = await fetch(urlServices)
        .then(dataservices => {
            if (dataservices.ok) {
                return dataservices.json();  // Procesa la respuesta como JSON
            }
            throw new Error('Error en la respuesta del servidor');
        })
        .then(res => {
            llenarSelectServicios(res)
            mostrarServicios(res)
            servicesData = res
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

//--------------Metodo Post ---------------------- //
document.getElementById('btn-form-Reser').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    // Capturar los datos del formulario
    const formData = {
        type_identification: document.querySelector('select[name="type_identification"]').value,
        number_id: document.querySelector('input[name="number_id"]').value,
        name: document.querySelector('input[name="name"]').value,
        telephone: document.querySelector('input[name="telephone"]').value,
        email: document.querySelector('input[name="email"]').value,
        fecha_ini: document.querySelector('input[name="fecha_ini"]').value,
        fecha_finish: document.querySelector('input[name="fecha_finish"]').value,
        nombre_servicio: document.querySelector('select[name="nombre_servicio"]').value,
        tipo_habitacion: document.querySelector('select[name="tipo_habitacion"]').value
    };

    // Validar datos no vacíos y mostrar mensajes personalizados
    let formIsValid = true;

    for (const key in formData) {
        const field = document.querySelector(`[name="${key}"]`);
        if (formData[key] === '' || formData[key] === null) {
            field.setCustomValidity(`Por favor, completa este campo.`);
            formIsValid = false;
        } else {
            field.setCustomValidity(''); // Restablecer el mensaje de error
        }
        field.reportValidity(); // Mostrar el mensaje de error
    }

    // Validar fecha de inicio que sea igual o mayor a hoy
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato yyyy-mm-dd
    if (formData.fecha_ini < today) {
        document.querySelector('input[name="fecha_ini"]').setCustomValidity(`La fecha de inicio debe ser igual o mayor a hoy (${today}).`);
        formIsValid = false;
        document.querySelector('input[name="fecha_ini"]').reportValidity();
    } else {
        document.querySelector('input[name="fecha_ini"]').setCustomValidity('');
    }

    // Validar fecha de fin que sea mayor o igual a la fecha de inicio
    if (formData.fecha_finish < formData.fecha_ini) {
        document.querySelector('input[name="fecha_finish"]').setCustomValidity(`La fecha de fin no puede ser menor que la fecha de inicio.`);
        formIsValid = false;
        document.querySelector('input[name="fecha_finish"]').reportValidity();
    } else {
        document.querySelector('input[name="fecha_finish"]').setCustomValidity('');
    }
    console.log(formData)
    //METODO AJAX ENVIO DE DATOS
    if (formIsValid) {
        // Crear una instancia de XMLHttpRequest
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost/proyecto/TrabajoUniversidad/backend/Api-rest-client/create_client.php', true)
        // Reemplaza 'URL_DE_TU_API' con la URL de tu servidor
        // Establecer las cabeceras
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        // Manejar la respuesta del servidor
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Éxito
                console.log('Success:', JSON.parse(xhr.responseText))
            } else {
                // Error
                console.error('Error:', xhr.statusText);
            }
        }
                // Enviar los datos
        xhr.send(JSON.stringify(formData));
    }
});



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
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//funcionalidad botones
document.getElementById('contact-button').addEventListener('click', function () {
    document.getElementById('contactanos').scrollIntoView({ behavior: 'smooth' });
});

//function precios
function calcularPrecios(precioConDescuento, descuento) {
    const precioOriginal = (precioConDescuento / (1 - (descuento / 100))).toFixed(2);
    return {
        precioConDescuentoFormateado: precioConDescuento.toLocaleString('es-CO').replace(/,/g, '.'),
        precioOriginalFormateado: parseFloat(precioOriginal).toLocaleString('es-CO').replace(/,/g, '.')
    };
}

//cargar habitaciones en con javascript
function mostrarHabitaciones(data) {
    const container = document.querySelector('.habitaciones');  // Donde se mostrarán las tarjetas
    container.innerHTML = '';  // Limpiamos el contenedor antes de agregar los nuevos productos

    data.forEach(habitacion => {
        if (habitacion.habitación_id === 0) return;
        const card = document.createElement('div');
        card.classList.add('card-product');
        // Convertir el tipo de habitación a minúsculas
        const tipoHabitacion = habitacion.tipo_habitación
        // Construir la ruta de la imagen dinámica en minúsculas
        const imagenSrc = `../backend/includes/img/Habitaciones/${tipoHabitacion}.jpg`;

        const precioConDescuento = parseFloat(habitacion.precio_noche);

        const descuento = 22;
        // Calculamos el precio original
        const { precioConDescuentoFormateado, precioOriginalFormateado } = calcularPrecios(parseFloat(habitacion.precio_noche), descuento)

        // Creamos la estructura HTML de la tarjeta
        card.innerHTML = `
            <div class="container-img">
                <img src="${imagenSrc ? imagenSrc : 'ruta/por/defecto.jpg'}" alt="${habitacion.tipo_habitación}" />
                <span class="discount">-${descuento}%</span>
                <div class="button-group">
                    <button onclick="viewAll(${habitacion.habitación_id})"><i class="fa-regular fa-eye"></i></button>
                    <button onclick="openReservationModal()"><i class="fa-solid fa-code-compare"></i></button>
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
                <p class="price">$${precioConDescuentoFormateado}
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
        if (servicio.servicio_id === 0) return;
        const card = document.createElement('div');
        card.classList.add('card-product');
        // Convertir el tipo de servicio a minúsculas
        const tiposervicio = servicio.servicio_id;
        // Construir la ruta de la imagen dinámica en minúsculas
        const imagenserSrc = `../backend/includes/img/Servicios/${tiposervicio}.jpg`;

        const descuento = 25;
        // Calculamos el precio original
        const { precioConDescuentoFormateado, precioOriginalFormateado } = calcularPrecios(parseFloat(servicio.precio), descuento);

        // Creamos la estructura HTML de la tarjeta
        card.innerHTML = `
            <div class="container-img">
                <img src="${imagenserSrc ? imagenserSrc : 'ruta/por/defecto.jpg'}" alt="${servicio.nombre_servicio}" />
                <span class="discount">-${descuento}%</span>
                <div class="button-group">
                    <button onclick="viewServices(${servicio.servicio_id})"><i class="fa-regular fa-eye"></i></button>
                    <button onclick="openReservationModal()"><i class="fa-solid fa-code-compare"></i></button>
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
                <h3>${servicio.nombre_servicio}</h3>
                <p class="description">
                    ${servicio.descripción.length > 40 ? servicio.descripción.substring(0, 30) + '...' : servicio.descripción}
                </p>
                <p class="price">$${precioConDescuentoFormateado}
                <span>$${precioOriginalFormateado}</span></p>
            </div>
        `;

        // Añadimos la tarjeta al contenedor
        container.appendChild(card);
    });
}


// Función para llenar el select de tipoHabitacion
function llenarSelectHabitaciones(data) {
    data.forEach(habitacion => {
        const option = document.createElement('option');
        option.value = habitacion.habitación_id
        option.textContent = habitacion.tipo_habitación
        tipoHabitacionSelect.appendChild(option);
    });
}

// Función para llenar el select de nombreServicio
function llenarSelectServicios(res) {
    res.forEach(servicio => {
        const option = document.createElement('option')
        option.value = servicio.servicio_id
        option.textContent = servicio.nombre_servicio
        nombreServicioSelect.appendChild(option)
    });
}
// Abrir el modal al hacer click al icono
function openReservationModal() {
    const reservationModal = document.getElementById('reservation-modal');
    modal.style.display = 'flex';
}

// Abrir el modal al hacer clic en "Reserva Ahora"
reserveBtn.addEventListener('click', function (e) {
    e.preventDefault()
    modal.style.display = 'flex'
});

// Cerrar el modal al hacer clic en el botón de cerrar o fuera del modal
closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
// Evento para abrir el modal de reservación al hacer clic en "Crear Reservación"
document.getElementById('reserve-btn-modal').addEventListener('click', function () {
    document.getElementById('info-modal').style.display = 'none';
    document.getElementById('reservation-modal').style.display = 'flex';
});

//Funcion mobal ver más
// Función para mostrar el modal
function viewAll(habitacionId) {
    const habitacionSeleccionada = habitacionesData.find(habitacion => habitacion.habitación_id === habitacionId);
    // Usar la función calcularPrecios para obtener los precios formateados

    if (habitacionSeleccionada) {
        const descuento = 22;
        const { precioConDescuentoFormateado, precioOriginalFormateado } = calcularPrecios(parseFloat(habitacionSeleccionada.precio_noche), descuento);
        document.getElementById('modal-content-dynamic').innerHTML = `
            <h1>${habitacionSeleccionada.tipo_habitación}</h1>
            <div id="modal-img-description">
            <img src="../backend/includes/img/Habitaciones/${habitacionSeleccionada.tipo_habitación}.jpg" alt="${habitacionSeleccionada.tipo_habitación}" />
            <p>${habitacionSeleccionada.descripción}</p>
            </div>
            <h2 class="price">Precio por noche: $${precioConDescuentoFormateado}
            <span>$${precioOriginalFormateado}</span></h2>
        `;
        document.getElementById('info-modal').style.display = 'flex';  // Muestra el modal
    }
}
function viewServices(servicioId) {
    // Buscar el servicio seleccionado por su ID
    const servicioSeleccionado = servicesData.find(servicio => servicio.servicio_id === servicioId);

    if (servicioSeleccionado) {
        const descuento = 25;
        const { precioConDescuentoFormateado, precioOriginalFormateado } = calcularPrecios(parseFloat(servicioSeleccionado.precio), descuento);

        // Rellenamos el contenido dinámico del modal
        document.getElementById('modal-content-dynamic').innerHTML = `
            <h1>${servicioSeleccionado.nombre_servicio}</h1>
            <div id="modal-img-description">
                <img src="../backend/includes/img/Servicios/${servicioSeleccionado.servicio_id}.jpg" alt="${servicioSeleccionado.nombre_servicio}" />
                <p>${servicioSeleccionado.descripción}</p>
            </div>
            <h2 class="price">Precio: $${precioConDescuentoFormateado}
            <span>$${precioOriginalFormateado}</span></h2>
        `;

        // Mostrar el modal de información del servicio
        document.getElementById('info-modal').style.display = 'flex';
    }
}

// Evento para cerrar el modal
document.getElementById('close-info-modal').addEventListener('click', function () {
    document.getElementById('info-modal').style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera de él
window.addEventListener('click', function (event) {
    const modal = document.getElementById('info-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});





window.onload = function () {
    obtenerDatosServicios();
    obtenerDatosHabitaciones();

};
