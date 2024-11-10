<?php
require_once "includes/Database.php";
require_once "includes/ServicesandHabitation.php";

// Obtener la lista de habitaciones
$habitationInfo = ServicesandHabitation::get_all_habitation();

// Verificar si se obtuvieron resultados
if ($habitationInfo !== false) {
    header('Content-Type: application/json');
    echo $habitationInfo;
} else {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Error al consultar las habitaciones.']);
}
?>
