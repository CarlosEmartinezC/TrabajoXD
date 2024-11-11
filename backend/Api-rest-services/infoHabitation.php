<?php
// Encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept");

// Incluir archivos necesarios
require_once "../includes/Database.php";
require_once "../includes/ServicesandHabitation.php";

// Manejar la solicitud GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener la lista de habitaciones
    $habitationInfo = ServicesandHabitation::get_all_habitation();

    // Verificar que los datos no estén vacíos
    if ($habitationInfo !== false && !empty($habitationInfo)) {
        header('Content-Type: application/json');
        echo $habitationInfo; // Imprimir la respuesta JSON
        exit; // Detener la ejecución
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'No hay habitaciones disponibles.']);
        exit; // Detener la ejecución
    }
} else {
    // Enviar mensaje de error si el método no es GET
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
    exit; // Detener la ejecución
}

