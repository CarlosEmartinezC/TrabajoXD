<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept");

require_once "../includes/ServicesandHabitation.php";
if($_SERVER['REQUEST_METHOD'] == 'GET'){
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
}