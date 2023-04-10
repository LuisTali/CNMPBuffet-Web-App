export const querys = {
    getAllFoods: 'SELECT idPlato,nombre,descripcion,precio,platoDia,nombreCat FROM plato INNER JOIN Categoria AS c ON c.idCategoria = plato.idCategoria ORDER BY plato.idCategoria',
    getFoodById: 'SELECT * FROM plato WHERE idPlato = @id',
    registerUser: 'INSERT INTO Usuario VALUES (@username,@password)',
    logIn: 'SELECT * FROM Usuario WHERE username = @username AND password = @password',
    increasePriceByCategory: 'UPDATE plato SET precio = (precio + (precio * @aumento)) FROM plato AS p INNER JOIN categoria AS c ON p.idCategoria = c.idCategoria WHERE c.nombreCat = @categoriaAumento',
    decreasePriceByCategory: 'UPDATE plato SET precio = (precio - (precio * @decremento)) FROM plato AS p INNER JOIN categoria AS c ON p.idCategoria = c.idCategoria WHERE c.nombreCat = @categoriaDecremento'
}