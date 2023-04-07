export const querys = {
    getAllFoods: 'SELECT * FROM plato ORDER BY idCategoria',
    getFoodById: 'SELECT * FROM plato WHERE idPlato = @id'
}