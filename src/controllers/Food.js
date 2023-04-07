import { getConnection,querys,sql } from "../database";

export const getAllFoods = async(req,res)=>{
    try {
        const pool = await getConnection();
        let result = await pool.request().query(querys.getAllFoods);
        console.log(result.recordset);
        //return res.status(200).json({success:true,foods:result.recordset})
        res.render('home.handlebars',{admin:true,foods:result.recordset});
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