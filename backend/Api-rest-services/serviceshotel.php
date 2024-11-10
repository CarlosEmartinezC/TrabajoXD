<?php
require_once "../includes/Database.php";
require_once "../includes/ServicesandHabitation.php";

// Obtener la lista de habitaciones
$servicesInfo = ServicesandHabitation::get_all_services();

// Verificar si se obtuvieron resultados
if ($servicesInfo !== false) {
    header('Content-Type: application/json');
    echo $servicesInfo;
} else {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Error al consultar los servicios.']);
}
