<?php
require_once('Database.php');

class ServicesandHabitation {
    public static function get_all_services() {
        $database = new Database();
        $conn = $database->getConnection();
        $stmt = $conn->prepare("SELECT * FROM `servicios`");
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Agregar la ruta completa de las imágenes
            foreach ($result as &$servicio) {
                $nombre_imagen = strtolower(str_replace(" "," ", $servicio["nombre_servicio"]));
                $ruta_imagen = 'backend/includes/img/Servicios/' . $nombre_imagen . ".jpg";
                if (file_exists($ruta_imagen)) {
                    $servicio['imagen'] = $ruta_imagen;
                } else {
                    // Asignar un valor por defecto si la imagen no existe
                    $servicio['imagen'] = 'backend/includes/img/default.jpg';
                }
            }

            return json_encode($result);
        } else {
            return false;
        }
    }

    public static function get_all_habitation() {
        $database = new Database();
        $conn = $database->getConnection();
        $stmt = $conn->prepare("SELECT * FROM `habitaciones`");
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Agregar la ruta completa de las imágenes basadas en el tipo de habitación
            foreach ($result as &$habitacion) {
                $tipo_habitacion = strtolower(str_replace(' ', '_', $habitacion['tipo_habitación']));
                $ruta_imagen = '../includes/img/Habitaciones/'.$tipo_habitacion . ".jpg";
                if (file_exists($ruta_imagen)) {
                    $habitacion['imagen'] = $ruta_imagen;
                } else {
                    // Asignar un valor por defecto si la imagen no existe
                    $habitacion['imagen'] = '';
                }
            }

            return json_encode($result);
        } else {
            return false;
        }
    }
}




