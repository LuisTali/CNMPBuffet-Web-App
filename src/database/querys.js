export const querys = {
    getAllFoods: 'SELECT * FROM plato ORDER BY idCategoria',
    getFoodById: 'SELECT * FROM plato WHERE idPlato = @id',
    registerUser: 'INSERT INTO Usuario VALUES (@username,@password)',
    logIn: 'SELECT * FROM Usuario WHERE username = @username AND password = @password'
}