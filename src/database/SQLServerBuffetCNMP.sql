CREATE DATABASE CNMPBuffet;
USE CNMPBuffet;

CREATE TABLE Plato(
	idPlato int IDENTITY(1,1) CONSTRAINT pkPlato PRIMARY KEY,
	nombre varchar(50) NOT NULL CONSTRAINT uqPlato UNIQUE,
	descripcion varchar(200),
	precio float null DEFAULT 0.00,
	platoDia bit null DEFAULT 0,
	idCategoria int NOT NULL CONSTRAINT fkPlato1 FOREIGN KEY REFERENCES Categoria(idCategoria)
	--Permite valor nulo y su valor por default es 0, ya que el plato del dia se escoge luego.
);
CREATE TABLE Usuario(
	idUser int IDENTITY(1,1) CONSTRAINT pkUsuarios PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	isAdmin bit NOT NULL default 0,
	[password] varchar(50) CONSTRAINT ckUsuarios1 CHECK ([password] LIKE '[a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9]%')
	--password LIKE 8 caracteres o mas, permitiendo letras de la A a la Z y numeros de 0 a 9
);

CREATE TABLE Categoria(
	idCategoria int IDENTITY(1,1) CONSTRAINT pkCategoria PRIMARY KEY,
	nombreCat varchar(30) NOT NULL CONSTRAINT uqCategoria1 UNIQUE
);