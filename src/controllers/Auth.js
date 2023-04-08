import { getConnection,sql,querys } from "../database";
import User from '../models/User'
export const login = async(req,res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.logIn);
        if(result.recordset[0] != undefined){
            let user = new User(recordset[0].username,recorset[0].password)
            res.render('home.handlebars',{User: user})
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:error.message});
    }
}