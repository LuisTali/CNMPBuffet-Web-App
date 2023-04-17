CREATE DATABASE CNMPBuffet;

CREATE TABLE Plato(
	idPlato int IDENTITY(1,1) CONSTRAINT pkPlato PRIMARY KEY,
	nombre varchar(50) NOT NULL CONSTRAINT uqPlato UNIQUE,
	descripcion varchar(200),
	precio float null DEFAULT 0.00,
	idCategoria int NOT NULL CONSTRAINT fkPlato1 FOREIGN KEY REFERENCES Categoria(idCategoria)
	--Permite valor nulo y su valor por default es 0, ya que el plato del dia se escoge luego.
);
CREATE TABLE Usuario(
	idUser int IDENTITY(1,1) CONSTRAINT pkUsuarios PRIMARY KEY,
	[password] varchar(50) CONSTRAINT ckUsuarios1 CHECK ([password] LIKE '[a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9][a-z,0-9]%')
	--password LIKE 8 caracteres o mas, permitiendo letras de la A a la Z y numeros de 0 a 9
);
CREATE TABLE Categoria(
	idCategoria int IDENTITY(1,1) CONSTRAINT pkCategoria PRIMARY KEY,
	nombreCat varchar(30) NOT NULL CONSTRAINT uqCategoria1 UNIQUE
);
CREATE TABLE PlatoDelDia(
	idPlatoDia int IDENTITY(1,1) CONSTRAINT pkPlatoDia PRIMARY KEY,
	nombre varchar(50) NOT NULL CONSTRAINT uqPlatoDia UNIQUE,
	descripcion varchar(200),
	flagDia bit null DEFAULT 1
);

--Trigger para que al actualizar el plato del dia se setee ese en estado 1 y el resto en 0, puediendo asi obtener el plato del dia
CREATE TRIGGER updateFlagsDayTo0 ON PlatoDelDia
AFTER UPDATE,INSERT
AS 
BEGIN 
	UPDATE PlatoDelDia SET flagDia = 0 FROM PlatoDelDia AS pD 
	LEFT JOIN INSERTED ON INSERTED.idPlatoDia = pD.idPlatoDia 
	WHERE INSERTED.idPlatoDia is null;
END