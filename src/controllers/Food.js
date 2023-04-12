import { getConnection,querys,sql } from "../database";
import {User} from '../models/User'

export const getAllFoods = async(req,res)=>{
    try {
        let userLogged = undefined;
        let admin = 0;

        if(req.session.loggedUser == 1){
            
            userLogged = req.session.user;
            admin = userLogged.admin;
            userLogged = userLogged.username;
            console.log(userLogged,admin);
        }
        

        const pool = await getConnection();
        let result = await pool.request().query(querys.getAllFoods);
       
        let foods= result.recordset;

        let pescados = filterArrayFoods(foods,'pescados y mariscos');
        let guarniciones = filterArrayFoods(foods,'guarnicion')
        let cafeteria = filterArrayFoods(foods,'cafeteria');
        let carnesBlancas = filterArrayFoods(foods,'carnes blancas');
        let carnesRojas = filterArrayFoods(foods,'carnes rojas');
        let ensaladas = filterArrayFoods(foods,'ensaladas');
        let entradas = filterArrayFoods(foods,'entradas');
        let sandwich = filterArrayFoods(foods,'sandwich');
        let pastas = filterArrayFoods(foods,'pastas');
        let menuInfantil = filterArrayFoods(foods,'menu infantil');
        let cervezas = filterArrayFoods(foods,'cervezas');
        let bebidas = filterArrayFoods(foods,'bebidas');
        let arroces = filterArrayFoods(foods,'arroces');
        let postres = filterArrayFoods(foods,'postres');

        res.render('home.handlebars',{admin:admin,userLogged:userLogged,guarniciones:guarniciones,carnesRojas:carnesRojas,carnesBlancas:carnesBlancas,pastas:pastas,sandwichs:sandwich,pescados:pescados,entradas:entradas,ensaladas:ensaladas,cafeteria:cafeteria,menuInfantil:menuInfantil,cervezas:cervezas,bebidas:bebidas,arroces:arroces,postres:postres});
    } catch (error) {
        return res.status(400).json({success:false,msg:error.message});
    }
}

export const getFoodById = async(req,res)=>{
    let {id} = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request().input("id",sql.Int,id).query(querys.getFoodById);
        console.log(result.recordset[0]);
        if(result.recordset[0] === undefined){ return res.status(400).json({success:false,msg:'There is not a food with that id'}) }
        res.render('foodDetails.handlebars',{admin:true,foodDay: result.recordset[0]});
    } catch (error) {
        return res.status(400).json({success:false,msg:error.message});
    }
}

//Para obtener las comidas desde el Controller Auth
export const getFoodsValues = async()=>{
    try {
        const pool = await getConnection();
        let result = await pool.request().query(querys.getAllFoods);
        return result.recordset;
    } catch (error) {
        return json({success:false,msg:error.message});
    }
}

//Filtra las comidas por categoria, retornando los platos de la categoria deseada
export const filterArrayFoods = (foods,nombreCat) =>{
    let array = foods.filter((food) => (food.nombreCat).toLowerCase() == nombreCat);
    return array;
}

//Filtra todas las comidas excepto las de la categoria pedida, haciendo que cada vez que se obtiene un arreglo de una categoria, sea eliminado del array general, facilitando la busqueda o filtrado
const deleteFilteredFoodsArray = (foods,nombreCat) =>{
    foods = foods.filter((food) => (food.nombreCat).toLowerCase() != nombreCat);
    return foods;
}

export const updateDishesPrice = async(req,res) =>{
    try {
        let {categoria,porcentaje,opcionSeleccionada} = req.body;
        console.log(categoria,porcentaje,opcionSeleccionada);
        const pool = await getConnection();
        let result;
        if(opcionSeleccionada === 'aumentar'){
            console.log('Opcion Aumentar');
            result = await pool.request().input("aumento",sql.Float,porcentaje).input("categoriaAumento",sql.VarChar,categoria).query(querys.increasePriceByCategory);
            return res.json({redirect: '/foods'})
        }else if(opcionSeleccionada === 'disminuir'){
            console.log('Opcion Disminuir');
            result = await pool.request().input("decremento",sql.Float,porcentaje).input("categoriaDecremento",sql.VarChar,categoria).query(querys.decreasePriceByCategory);
            console.log(result);
            return res.json({redirect: '/foods'})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({success:false,msg:error.message});
    }
}