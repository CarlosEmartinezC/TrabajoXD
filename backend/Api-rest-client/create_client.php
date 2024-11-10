<?php
require_once('../includes/client.class.php');
require_once('../includes/config/respuestas.php'); // Incluir las respuestas

$respuestas = new respuestas();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['email']) && isset($_POST['name']) && isset($_POST['number_id']) &&
        isset($_POST['telephone']) && isset($_POST['type_identification'])) {

        $result = Client::crear_client(
            $_POST['type_identification'],
            $_POST['number_id'],
            $_POST['name'],
            $_POST['telephone'],
            $_POST['email']
        );

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode(array("status" => "ok", "message" => "El cliente ha sido creado exitosamente."));
        } else {
            header('Content-Type: application/json');
            echo json_encode($respuestas->error_500("Error al crear el cliente."));
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode($respuestas->error_400());
    }
} else {
    header('Content-Type: application/json');
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode($respuestas->error_405());
}


