import { getConnection,sql,querys } from "../database";
import {User} from '../models/User'
import { getFoodsValues } from "./Food";

export const showLogin = async(req,res) =>{
    try {
        res.render('login.handlebars');
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message});
    }
}

export const login = async(req,res) => {
    try {
        const {username,password} = req.body;

        if(username === undefined || password === undefined){ return res.status(400).json({success:false,msg:'Please fill all fields'})}

        const pool = await getConnection();
        const result = await pool.request().input("username",sql.VarChar,username).input("password",sql.VarChar,password).query(querys.logIn);
        if(result.recordset[0] != undefined){
            let username = result.recordset[0].username;
            let password = result.recordset[0].password;

            let user = new User(username,password);
            
            ((user!==undefined) ? console.log(`Usuario creado, Admin: ${user.getAdmin()}`) : console.log('Usuario undefinido'));
            
            let foods = await getFoodsValues();

            //Podria cambiar la query y traer las comidas con el nombre de la categoria escrito y no su id
            let guarniciones = foods.filter((food) => food.idCategoria == 7);
            let carnesBlancas = foods.filter((food) => food.idCategoria == 6);
            let ensaladas = foods.filter((food) => food.idCategoria == 8);
            res.render('home.handlebars',{success:true, User:user, guarniciones:guarniciones, carnesBlancas:carnesBlancas, ensaladas: ensaladas, admin:user.getAdmin(), msg:`Welcome back ${user.getUsername()}`})
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message});
    }
}

export const registerUser = async(req,res) =>{
    try {
        const {username,password} = req.body;
        const pool = await getConnection();
        const result = await pool.request().input("username",sql.VarChar,username).input("password",sql.VarChar,password).query(querys.registerUser);
        if(result.rowsAffected > 0){
            let foods = getFoodsValues();
            res.json({page:'home.handlebars',admin:false,Foods:foods,alert:'User register succesful'});
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message});
    }
}