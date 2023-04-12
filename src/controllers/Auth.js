import { getConnection,sql,querys } from "../database";
import {User} from '../models/User'
import { getFoodsValues, filterArrayFoods } from "./Food";

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
            
            req.session.user = user;
            req.session.loggedUser = 1;
            res.redirect('/foods');
            
            /*let foods = await getFoodsValues();
            
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
            
            res.render('home.handlebars',{success:true, User:user, admin:user.getAdmin(), msg:`Welcome back ${user.getUsername()}`,guarniciones:guarniciones,carnesRojas:carnesRojas,carnesBlancas:carnesBlancas,pastas:pastas,sandwichs:sandwich,pescados:pescados,entradas:entradas,ensaladas:ensaladas,cafeteria:cafeteria,menuInfantil:menuInfantil,cervezas:cervezas,bebidas:bebidas,arroces:arroces,postres:postres})*/
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message});
    }
}

export const logOut = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/foods');
    } catch (error) {
        res.status(400).json({success:false,msg:error.message});
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