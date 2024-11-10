<?php

    require_once('Database.php');

    class Client {
        public static function crear_client($typeID, $number_id, $name, $telephone, $email){
            $database = new Database();
            $conn = $database->getConnection();

            $stmt = $conn->prepare('INSERT INTO clientes (tipo_identificación, número_documento, nombre_completo, número_celular, correo_electrónico)
                VALUES (:typeID, :number_id, :name, :telephone, :email )');
            $stmt->bindParam(':typeID', $typeID);
            $stmt->bindParam(':number_id', $number_id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':telephone', $telephone);
            $stmt->bindParam(':email', $email);

            if($stmt->execute()){
                return true;
            } else{
                return false;
            }
        }
            public static function get_all_clients(){
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare( "SELECT * FROM `clientes`");
            if($stmt->execute()){
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($result);
                header('HTTP/1.1 201 OK');
            } else {
                header('HTTP/1.1 404 No se ha podido consultar los clientes');
            }
        }
    }


