CREATE DATABASE hotel_db;
USE hotel_db;

-- Tabla Clientes
CREATE TABLE Clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_identificación VARCHAR(50) NOT NULL,
    número_documento VARCHAR(20) UNIQUE NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    número_celular VARCHAR(20) NOT NULL,
    correo_electrónico VARCHAR(100) NOT NULL
);

-- Tabla Servicios
CREATE TABLE Servicios (
    servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripción TEXT,
    precio DECIMAL(10, 2) NOT NULL
);

-- Tabla Habitaciones
CREATE TABLE Habitaciones (
    habitación_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_habitación VARCHAR(50) NOT NULL,
    descripción TEXT,
    precio_noche DECIMAL(10, 2) NOT NULL
);

-- Tabla Registro
CREATE TABLE Registro (
    registro_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    servicio_id INT,
    habitación_id INT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id),
    FOREIGN KEY (servicio_id) REFERENCES Servicios(servicio_id),
    FOREIGN KEY (habitación_id) REFERENCES Habitaciones(habitación_id)
);
