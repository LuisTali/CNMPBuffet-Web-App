export const querys = {
    getAllFoods: 'SELECT idPlato,nombre,descripcion,round(precio, 0, 1)precio,nombreCat FROM plato INNER JOIN Categoria AS c ON c.idCategoria = plato.idCategoria ORDER BY plato.idCategoria',
    getFoodById: 'SELECT * FROM plato WHERE idPlato = @id',
    registerUser: 'INSERT INTO Usuario VALUES (@username,@password)',
    logIn: 'SELECT * FROM Usuario WHERE username = @username AND password = @password',
    increasePriceByCategory: 'UPDATE plato SET precio = (precio + (precio * @aumento)) FROM plato AS p INNER JOIN categoria AS c ON p.idCategoria = c.idCategoria WHERE c.nombreCat = @categoriaAumento',
    decreasePriceByCategory: 'UPDATE plato SET precio = (precio - (precio * @decremento)) FROM plato AS p INNER JOIN categoria AS c ON p.idCategoria = c.idCategoria WHERE c.nombreCat = @categoriaDecremento',
    updatePriceById: 'UPDATE plato SET precio = @precio WHERE idPlato = @id',
    insertDishOfDay:'INSERT INTO PlatoDelDia VALUES (@nombre,@descripcion,1)',
    updateDishOfDay: 'UPDATE PlatoDelDia SET flagDia = 1 WHERE idPlatoDia = @idElegido', //Se ejecuta al elegir un plato de los ya cargados
    getDishOfDay: 'SELECT nombre,descripcion FROM PlatoDelDia WHERE flagDia = 1',
    getListDishesOfDay: 'SELECT * FROM PlatoDelDia'
}