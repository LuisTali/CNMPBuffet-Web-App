export const querys = {
    getAllFoods: 'SELECT idPlato,nombre,descripcion,precio,platoDia,nombreCat FROM plato INNER JOIN Categoria AS c ON c.idCategoria = plato.idCategoria ORDER BY plato.idCategoria',
    getFoodById: 'SELECT * FROM plato WHERE idPlato = @id',
    registerUser: 'INSERT INTO Usuario VALUES (@username,@password)',
    logIn: 'SELECT * FROM Usuario WHERE username = @username AND password = @password'
}