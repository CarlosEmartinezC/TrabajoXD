<?php
require_once('Database.php');

class ServicesandHabitation {
    public static function get_all_services() {
        $database = new Database();
        $conn = $database->getConnection();
        $stmt = $conn->prepare("SELECT * FROM `servicios`");
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
            return json_encode($result);
        } else {
            return false;
        }
    }
}

